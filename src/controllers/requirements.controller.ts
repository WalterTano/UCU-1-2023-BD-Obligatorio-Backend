import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as requirementModel from '../models/requirement';

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

export const getRequirement: RequestHandler<{ necessityId: string, skillId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }
        
        const skillId = req.params.skillId;

        const res = await requirementModel.hasRequirement(necessityId, skillId);
        return { success: true, data: res };
    }
);

export const postRequirement: RequestHandler<{ necessityId: string }> = toRequestHandler(
    async (req) => {
        const necessityId = parseInt(req.params.necessityId);
        if (isNaN(necessityId)) {
            return { success: false, errorMessage: "Invalid necessity id" };
        }
        
        const skillName = req.body.skillName;
        if (typeof skillName !== "string") {
            return { success: false, errorMessage: "Invalid skill name" };
        }

        const res = await requirementModel.postRequirement({ necessityId, skillName });
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
