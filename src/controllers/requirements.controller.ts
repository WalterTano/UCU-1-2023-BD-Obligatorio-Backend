import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as requirementModel from '../models/requirement';
import { Requirement } from "../interfaces/requirement";

export const getRequirements: RequestHandler<{ necessityId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }
        
        const res = await requirementModel.getRequirements(necessityId);
        return { success: true, data: res };
    }
);

export const postRequirements: RequestHandler<{ necessityId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }
        if (!req.body?.skillNames || !Array.isArray(req.body.skillNames)) {
            return { success: false, errorMessage: "Missing required array field in request's body: skillNames" }
        }

        const data: Requirement[] = req.body.skillNames.map((skillName: string) => ({
            skillName,
            necessityId
        }));

        const res = await requirementModel.postRequirements(data);
        return res;
    }
);

export const deleteRequirement: RequestHandler<{ necessityId: string, skillId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }
        
        const skillId = req.params.skillId;

        const res = await requirementModel.deleteRequirement(necessityId, skillId);
        return res;
    }
);
