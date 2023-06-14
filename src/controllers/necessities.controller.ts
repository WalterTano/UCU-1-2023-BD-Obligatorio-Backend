import { Request, RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { Result } from "../types/result";
import { getNecessities as modelGetNecessities, getNecessityById as modelGetNecessityById } from "../models/necessity";
import { insertNecessity } from "../models/necessity";

export const getNecessities: RequestHandler = toRequestHandler(
    async (req) => {
        const res = await modelGetNecessities();
        return { success: true, data: res };
    }
);

export const getNecessity: RequestHandler<{ id: string }> = toRequestHandler(
    async (req) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return { success: false, errorMessage: "Invalid id" };
        }

        const res = await modelGetNecessityById(id);
        if (res) {
            return { success: true, data: res };
        } else {
            return { success: false, errorMessage: "Necessity not found" };
        }
    }
);

export const postNecessity: RequestHandler = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const template = req.body;
        const res = await insertNecessity(template);
        return res;
    }
);

export const putNecessity: RequestHandler<{ id: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNecessity: RequestHandler<{ id: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
