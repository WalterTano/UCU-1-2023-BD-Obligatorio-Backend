import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as nominationModel from '../models/nomination';
import { getNumericQueryParam } from "../db/helpers/getQueryParams";

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

export const getNomination: RequestHandler<{ necessityId: string, userId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }

        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const res = await nominationModel.getNomination({ necessityId, userId });
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

export const putNomination: RequestHandler<{ necessityId: string, userId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }

        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const { status: newStatus } = req.body;
        if (typeof newStatus !== "string") {
            return { success: false, errorMessage: "Invalid new status" };
        }

        const result = await nominationModel.updateNomination({ necessityId, userId }, newStatus);
        return result;
    }
);

export const deleteNomination: RequestHandler<{ necessityId: string, userId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }

        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const result = await nominationModel.deleteNomination({ necessityId, userId });
        return result;
    }
);
