import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as postulationModel from '../models/postulation';
import { getNumericQueryParam } from "../db/helpers/getQueryParams";

export const getPostulations: RequestHandler = toRequestHandler(
    async (req) => {
        const necessityIdRes = getNumericQueryParam(req.query.necessityId, "Invalid necessity id");
        if (!necessityIdRes.success) {
            return necessityIdRes;
        }
        const necessityId = necessityIdRes.data;

        const userIdRes = getNumericQueryParam(req.query.userId, "Invalid user id");
        if (!userIdRes.success) {
            return userIdRes;
        }
        const userId = userIdRes.data;

        const res = await postulationModel.getPostulations({ necessityId, userId });
        return { success: true, data: res };
    }
);

export const getPostulation: RequestHandler<{ necessityId: string, userId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }

        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const res = await postulationModel.getPostulation({ necessityId, userId });
        return { success: true, data: res };
    }
);

export const postPostulation: RequestHandler = toRequestHandler(
    async (req) => {
        const input = req.body;

        const result = await postulationModel.insertPostulation(input);
        return result;
    }
);

export const putPostulation: RequestHandler<{ necessityId: string, userId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }

        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const { newStatus } = req.body;
        if (typeof newStatus !== "string") {
            return { success: false, errorMessage: "Invalid new status" };
        }

        const result = await postulationModel.updatePostulation({ necessityId, userId }, newStatus);
        return result;
    }
);

export const deletePostulation: RequestHandler<{ necessityId: string, userId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }

        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const result = await postulationModel.deletePostulation({ necessityId, userId });
        return result;
    }
);
