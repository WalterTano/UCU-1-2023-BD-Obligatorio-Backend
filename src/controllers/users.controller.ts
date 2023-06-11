import { RequestHandler } from "express";
import { findByCI, getUsers as getUsersModel, deleteUser as deleteUserModel } from "../models/user";
import { Result } from "../types/result";
import { handleErrors } from "../helpers/controllers.helpers";

export const getUsers: RequestHandler = async (_req, res) => {
    const users = await getUsersModel();
    res.json(users);
};

export const getUser: RequestHandler<{ userId: string }> = handleErrors(
    async (req, res) => {
        const userId = req.params.userId;
        const user = await findByCI(userId);

        if (user) {
            res.json(user);
        } else {
            res.status(404).end();
        }
    }
);

export const postUser: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putUser: RequestHandler<{ userId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteUser: RequestHandler<{ userId: string }> = handleErrors(
    async (req, res) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            const response: Result<never> = { success: false, errorMsg: "Invalid CI" };
            return res.status(400).json(response);
        }

        const result = await deleteUserModel(userId);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }
);
