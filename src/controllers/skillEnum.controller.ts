import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as skillEnum from "../models/skillEnum";

export const getSkills: RequestHandler = toRequestHandler(
    async (_req) => {
        const skills = await skillEnum.getSkills();
        return { success: true, data: skills };
    }
);

export const getSkillByName: RequestHandler<{ skillId: string }> = toRequestHandler(
    async (req) => {
        const skillId = req.params.skillId;
        const data = await skillEnum.thereIsSkill(skillId);
        return { success: true, data };
    }
);
