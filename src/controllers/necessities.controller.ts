import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as necessityModel from "../models/necessity";
import { insertNecessity } from "../models/necessity";
import { getNumericArrayQueryParam, getStringArrayQueryParam, getStringQueryParam } from "../db/helpers/getQueryParams";
import { NecessityFilter } from "../interfaces/necessityFilter";

export const getNecessities: RequestHandler = toRequestHandler(
    async (req) => {
        const idsRes = getNumericArrayQueryParam(req.query.ids, "Invalid id list");
        if (!idsRes.success) return idsRes;
        const ids = idsRes.data;

        const startDateMinRes = getStringQueryParam(req.query.startDateMin, "Invalid start date min");
        if (!startDateMinRes.success) return startDateMinRes;
        const startDateMin = startDateMinRes.data;

        const startDateMaxRes = getStringQueryParam(req.query.startDateMax, "Invalid start date min");
        if (!startDateMaxRes.success) return startDateMaxRes;
        const startDateMax = startDateMaxRes.data;

        const endDateMinRes = getStringQueryParam(req.query.endDateMin, "Invalid start date min");
        if (!endDateMinRes.success) return endDateMinRes;
        const endDateMin = endDateMinRes.data;

        const endDateMaxRes = getStringQueryParam(req.query.endDateMax, "Invalid start date min");
        if (!endDateMaxRes.success) return endDateMaxRes;
        const endDateMax = endDateMaxRes.data;

        const searchTermRes = getStringQueryParam(req.query.searchTerm, "Invalid start date min");
        if (!searchTermRes.success) return searchTermRes;
        const searchTerm = searchTermRes.data;

        const skillsRes = getStringArrayQueryParam(req.query.skills, "Invalid start date min");
        if (!skillsRes.success) return skillsRes;
        const skills = skillsRes.data;

        const filter: NecessityFilter = {
            ids,
            startDate: {
                min: startDateMin ? new Date(startDateMin) : undefined,
                max: startDateMax ? new Date(startDateMax) : undefined
            },
            endDate: {
                min: endDateMin ? new Date(endDateMin) : undefined,
                max: endDateMax ? new Date(endDateMax) : undefined
            },
            searchTerm,
            skills
        };

        const res = await necessityModel.getNecessities(filter);

        return { success: true, data: res };
    }
);

export const getNecessitiesByUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid user id" };
        }

        const res = await necessityModel.getNecessitiesByUser(userId);
        return { success: true, data: res };
    }
);

export const getNecessity: RequestHandler<{ id: string }> = toRequestHandler(
    async (req) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return { success: false, errorMessage: "Invalid id" };
        }

        const res = await necessityModel.getNecessityById(id);
        if (res) {
            return { success: true, data: res };
        } else {
            return { success: false, errorMessage: "Necessity not found" };
        }
    }
);

export const postNecessity: RequestHandler = toRequestHandler(
    async (req) => {
        const template = req.body;
        const res = await insertNecessity(template);
        return res;
    }
);

export const putNecessity: RequestHandler<{ id: string }> = toRequestHandler(
    async (req) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return { success: false, errorMessage: "Invalid id" };
        }

        const template = req.body;

        const result = await necessityModel.updateNecessity(id, template);
        return result;
    }
);

export const deleteNecessity: RequestHandler<{ id: string }> = toRequestHandler(
    async (req) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return { success: false, errorMessage: "Invalid id" };
        }

        const result = await necessityModel.deleteNecessity(id);
        return result;
    }
);
