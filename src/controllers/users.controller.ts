import { RequestHandler } from "express";
import { findByCI, getUsers as getUsersModel, updateUser, deleteUser as deleteUserModel, newUser } from "../models/user";
import { checkUserTemplate } from "../helpers/userTemplate";
import { toRequestHandler } from "../helpers/controllers.helpers";

export const getUsers: RequestHandler = toRequestHandler(async () => {
    const users = await getUsersModel();
    return { success: true, data: users };
});

export const getUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = req.params.userId;
        const user = await findByCI(userId);

        if (user) {
            return { success: true, data: user };
        } else {
            return { success: false, errorMessage: "User not found" }
        }
    }
);

export const postUser: RequestHandler = toRequestHandler(
    async (req) => {
        const input = req.body;

        if (!checkUserTemplate(input)) {
            return { success: false, errorMessage: "Invalid data" };
        }

        const result = await newUser(input);
        return result;
    }
);

export const putUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userCI = parseInt(req.params.userId);
        if (isNaN(userCI)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const result = await updateUser(userCI, req.body);
        return result;
    }
);

export const deleteUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const result = await deleteUserModel(userId);
        return result;
    }
);
