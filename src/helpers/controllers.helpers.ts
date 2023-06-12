import { Request, RequestHandler, Response } from "express";
import { Result } from "../types/result";

export function toRequestHandler<T, U>(fn: (req: Request<T>) => Promise<Result<U>>): RequestHandler<T> {
    return handleErrors(
        async (req, res) => {
            const result = await fn(req);
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        }
    );
}

export function handleErrors<T>(handler: RequestHandler<T>): RequestHandler<T> {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (e) {
            console.error(e);
            if (!res.writableEnded) {
                const msg: Result<never> = { success: false, errorMessage: "Internal server error" };
                res.status(500).json(msg);
            }
        }
    }
}
