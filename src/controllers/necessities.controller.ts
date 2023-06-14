import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { getNecessities as modelGetNecessities, getNecessityById as modelGetNecessityById, updateNecessity } from "../models/necessity";
import { insertNecessity } from "../models/necessity";

// TODO: in all update controllers, modify return logic:
//  If resource not found: { success: false, errorMessage: "Resource not found" }
//  If template is empty: { success: true, data: false }
//  If update is success: { success: true, data: true }

export const getNecessities: RequestHandler = toRequestHandler(
    async (_req) => {
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
        const template = req.body;
        const res = await insertNecessity(template);
        return res;
    }
);

export const putNecessity: RequestHandler<{ id: string }> = toRequestHandler(
    async (req) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return { success: false, errorMessage: "Invalid id" };
        }

        const template = req.body;

        const result = await updateNecessity(id, template);
        return result;
    }
);

export const deleteNecessity: RequestHandler<{ id: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
