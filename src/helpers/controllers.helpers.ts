import { RequestHandler } from "express";
import { Result } from "../types/result";

export function handleErrors<T>(handler: RequestHandler<T>): RequestHandler<T> {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (e) {
            console.error(e);
            if (!res.writableEnded) {
                const msg: Result<never> = { success: false, errorMsg: "Internal server error" };
                res.status(500).json(msg);
            }
        }
    }
}
