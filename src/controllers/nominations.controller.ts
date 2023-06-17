import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { ParsedQs } from 'qs';
import { Result } from "../types/result";
import * as nominationModel from '../models/nomination';

function getNumericQueryParam(v: string | string[] | ParsedQs | ParsedQs[] | undefined, msg: string): Result<number | undefined> {
    if (v === undefined) {
        return { success: true, data: undefined };
    }
    
    if (typeof v !== "string") {
        return { success: false, errorMessage: msg };
    }

    const num = parseInt(v);
    if (isNaN(num)) {
        return { success: false, errorMessage: msg };
    }

    return { success: true, data: num };
}

export const getNominations: RequestHandler = toRequestHandler(
    async (req) => {
        const necessityIdRes = getNumericQueryParam(req.query.necessityId, "Invalid necessity id");
        if (!necessityIdRes.success) {
            return necessityIdRes;
        }
        const necessityId = necessityIdRes.data;

        const userIdRes = getNumericQueryParam(req.query.userId, "Invalid user id");
        if (!userIdRes.success) {
            return userIdRes;
        }
        const userId = userIdRes.data;

        const res = await nominationModel.getNominations({ necessityId, userId });
        return { success: true, data: res };
    }
);

export const postNomination: RequestHandler = toRequestHandler(
    async (req) => {
        const input = req.body;

        const result = await nominationModel.insertNomination(input);
        return result;
    }
);

// TODO: determine format of nomination id
export const putNomination: RequestHandler<{posId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

// TODO: determine format of nomination id
export const deleteNomination: RequestHandler<{posId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
