import { Request, RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { Result } from "../types/result";
import { getNecessitiesByUser as modelGetNecessitiesByUser, getNecessityById as modelGetNecessityById } from "../models/necessity";

// TODO: utilize this function everywhere else
function checkIntParam<T extends string>(req: Request<{ [index in T]: string }>, param: T, msg: string): Result<number> {
    const num = parseInt(req.params[param]);
    if (isNaN(num)) {
        return { success: false, errorMessage: msg };
    }

    return { success: true, data: num };
}

// TODO: Replace all error messages about "invalid CI" with "invalid user id"
export const getNecessitiesByUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userIdRes = checkIntParam(req, "userId", "Invalid user id");
        if (!userIdRes.success) {
            return userIdRes;
        }
        const userId = userIdRes.data;

        const res = await modelGetNecessitiesByUser(userId);
        return { success: true, data: res };
    }
);

export const getNecessity: RequestHandler<{ userId: string, necId: string }> = toRequestHandler(
    async (req) => {
        const userIdRes = checkIntParam(req, "userId", "Invalid user id");
        if (!userIdRes.success) {
            return userIdRes;
        }
        const userId = userIdRes.data;

        const necIdRes = checkIntParam(req, "necId", "Invalid own id");
        if (!necIdRes.success) {
            return necIdRes;
        }
        const necId = necIdRes.data;

        const res = await modelGetNecessityById(userId, necId);
        if (res) {
            return { success: true, data: res };
        } else {
            return { success: false, errorMessage: "Necessity not found" };
        }
    }
);

export const postNecessity: RequestHandler<{ userId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putNecessity: RequestHandler<{ userId: string, necId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNecessity: RequestHandler<{ userId: string, necId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
