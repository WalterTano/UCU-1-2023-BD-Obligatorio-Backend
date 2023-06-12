import { RequestHandler } from "express";
import { findByCI, getUsers as getUsersModel, updateUser, deleteUser as deleteUserModel, newUser } from "../models/user";
import { checkUserTemplate } from "../helpers/userTemplate";
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

export const postUser: RequestHandler = handleErrors(
    async (req, res) => {
        const input = req.body;

        if (!checkUserTemplate(input)) {
            const response: Result<never> = { success: false, errorMessage: "Invalid data" };
            res.status(400).json(response);
            return;
        }

        const result = await newUser(input);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }
);

export const putUser: RequestHandler<{ userId: string }> = handleErrors(
    async (req, res) => {
        const userCI = parseInt(req.params.userId);
        if (isNaN(userCI)) {
            const response: Result<never> = { success: false, errorMessage: "Invalid CI" };
            return res.status(400).json(response);
        }

        const result = await updateUser(userCI, req.body);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }
);

export const deleteUser: RequestHandler<{ userId: string }> = handleErrors(
    async (req, res) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            const response: Result<never> = { success: false, errorMessage: "Invalid CI" };
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
