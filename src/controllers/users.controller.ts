import { RequestHandler } from "express";
import { getUsers as getUsersModel, deleteUser as deleteUserModel, newUser } from "../models/user";
import { checkUserTemplate } from "../helpers/userTemplate";
import { Result } from "../types/result";
import { handleErrors } from "../helpers/controllers.helpers";

export const getUsers: RequestHandler = async (req, res) => {
    const users = await getUsersModel();
    res.send(users);
};

export const getUser: RequestHandler<{ userId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postUser: RequestHandler = handleErrors(
    async (req, res) => {
        const input = req.body;

        if (!checkUserTemplate(input)) {
            const response: Result<never> = { success: false, errorMsg: "Invalid data" };
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
