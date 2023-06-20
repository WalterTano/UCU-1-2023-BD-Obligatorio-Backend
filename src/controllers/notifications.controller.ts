import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as notificationModel from '../models/notification';
import { getNumericQueryParam } from "../db/helpers/getQueryParams";

// TODO: Add filter by user id
export const getNotifications: RequestHandler = toRequestHandler(
    async (req) => {
        const userIdRes = getNumericQueryParam(req.query.userId, "Invalid user id");
        if (!userIdRes.success) return userIdRes;
        const userId = userIdRes.data;

        const notifications = await notificationModel.getNotifications({ userId });
        return { success: true, data: notifications };
    }
);

export const getNotification: RequestHandler<{ notificationId: string }> = toRequestHandler(
    async (req) => {
        const notificationId = parseInt(req.params.notificationId);
        if (isNaN(notificationId)) {
            return { success: false, errorMessage: "Invalid notification id" };
        }

        const result = await notificationModel.getNotification(notificationId);
        return { success: true, data: result };
    }
);

export const postNotification: RequestHandler = toRequestHandler(
    async (req) => {
        const input = req.body;

        const result = notificationModel.postNotification(input);
        return result;
    }
);

export const putNotification: RequestHandler<{ notificationId: string }> = toRequestHandler(
    async (req) => {
        const notificationId = parseInt(req.params.notificationId);
        if (isNaN(notificationId)) {
            return { success: false, errorMessage: "Invalid notification id" };
        }

        const { msg: newMsg } = req.body;
        if (typeof newMsg !== "string") {
            return { success: false, errorMessage: "Invalid new message" };
        }

        const result = await notificationModel.putNotification(notificationId, newMsg);
        return result;
    }
);

export const deleteNotification: RequestHandler<{ notificationId: string }> = toRequestHandler(
    async (req) => {
        const notificationId = parseInt(req.params.notificationId);
        if (isNaN(notificationId)) {
            return { success: false, errorMessage: "Invalid notification id" };
        }

        const result = await notificationModel.deleteNotification(notificationId);
        return result;
    }
);
