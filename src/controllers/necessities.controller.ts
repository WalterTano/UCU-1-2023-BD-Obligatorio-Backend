import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { insertNecessity } from "../models/necessity";


export const getNecessities: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getNecessity: RequestHandler<{userId: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postNecessity: RequestHandler<{userId: string}> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const template = req.body;
        const res = await insertNecessity(template, userId);
        return res;
    }
);

export const putNecessity: RequestHandler<{userId: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNecessity: RequestHandler<{userId: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
