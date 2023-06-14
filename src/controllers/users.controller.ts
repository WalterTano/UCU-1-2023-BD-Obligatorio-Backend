import { RequestHandler } from "express";
import { findByCI, getUsers as getUsersModel, updateUser, deleteUser as deleteUserModel, newUser } from "../models/user";
import { toRequestHandler } from "../helpers/controllers.helpers";

// TODO minor: change name of imports' alias from ...Model to model...

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
