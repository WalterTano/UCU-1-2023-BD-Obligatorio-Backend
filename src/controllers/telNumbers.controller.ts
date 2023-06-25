import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as telNumbersModel from "../models/telNumber";

export const getTelNumbers: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" }
        }

        const res = await telNumbersModel.getTelNumbers(userId);
        return { success: true, data: res };
    }
);

export const postTelNumbers: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" }
        }

        const input = req.body;

        const res = await telNumbersModel.postTelNumbers(userId, input);
        return { success: true, data: res };
    }
);

export const deleteTelNumbers: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" }
        }

        const input = req.body;

        const res = await telNumbersModel.deleteTelNumbers(userId, input);
        return { success: true, data: res };
    }
);

