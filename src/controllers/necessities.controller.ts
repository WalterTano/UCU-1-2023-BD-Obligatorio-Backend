import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { getNecessitiesByUser as modelGetNecessitiesByUser, getNecessities as modelGetNecessities, getNecessityById as modelGetNecessityById, updateNecessity, deleteNecessity as modelDeleteNecessity } from "../models/necessity";
import { insertNecessity } from "../models/necessity";

// TODO: in all update controllers, modify return format logic:
//  If resource not found: { success: false, errorMessage: "Resource not found" }
//  If template is empty: { success: true, data: false }
//  If update is success: { success: true, data: true }

// TODO: in all delete controllers: modify return format logic:
// If resource is deleted: { success: true, data: void 0 }
// If resource is not found: { success: false, errorMessage: "Resource not found" }

export const getNecessities: RequestHandler = toRequestHandler(
    async (_req) => {
        const res = await modelGetNecessities();
        return { success: true, data: res };
    }
);

export const getNecessitiesByUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const res = await modelGetNecessitiesByUser(userId);
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

export const deleteNecessity: RequestHandler<{ id: string }> = toRequestHandler(
    async (req) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return { success: false, errorMessage: "Invalid id" };
        }

        const result = await modelDeleteNecessity(id);
        return result;
    }
);
