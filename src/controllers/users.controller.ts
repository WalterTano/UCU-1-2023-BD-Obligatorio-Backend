import { RequestHandler } from "express";
import * as userModel from "../models/user";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { getNumericArrayQueryParam, getStringArrayQueryParam, getStringQueryParam } from "../db/helpers/getQueryParams";

export const getUsers: RequestHandler = toRequestHandler(
    async (req) => {
        const idsRes = getNumericArrayQueryParam(req.query.ids, "Invalid id list");
        if (!idsRes.success) return idsRes;
        const ids = idsRes.data;

        const firstNameRes = getStringQueryParam(req.query.firstName, "Invalid first name");
        if (!firstNameRes.success) return firstNameRes;
        const firstName = firstNameRes.data;

        const lastNameRes = getStringQueryParam(req.query.lastName, "Invalid first name");
        if (!lastNameRes.success) return lastNameRes;
        const lastName = lastNameRes.data;

        const skillsRes = getStringArrayQueryParam(req.query.skills, "Invalid skills");
        if (!skillsRes.success) return skillsRes;
        const skills = skillsRes.data;

        console.log("1:", skills);

        const users = await userModel.getUsers({ ids, firstName, lastName, skills });
        return { success: true, data: users };
    }
);

export const getUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = req.params.userId;
        const user = await userModel.findByCI(userId);

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

        const result = await userModel.newUser(input);
        return result;
    }
);

export const putUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userCI = parseInt(req.params.userId);
        if (isNaN(userCI)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const result = await userModel.updateUser(userCI, req.body);
        return result;
    }
);

export const deleteUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const result = await userModel.deleteUser(userId);
        return result;
    }
);
