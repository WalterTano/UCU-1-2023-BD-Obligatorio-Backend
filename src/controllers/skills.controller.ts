import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { getSkillOfUser, getSkillsOfUser, newSkillOfUser, getAllSkills, updateSkillOfUser, deleteSkillOfUser } from "../models/skill";

export const getSkills: RequestHandler = toRequestHandler(
    async (_req) => {
        const skills = getAllSkills();
        return { success: true, data: skills };
    }
);

// TODO: Replace multi-query mechanisms with join views
export const getSkillsByUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const data = await getSkillsOfUser(userId);

        return { success: true, data };
    }
);

export const getSkillByUser: RequestHandler<{ userId: string, skillId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const skillId = req.params.skillId;

        const skillOfUser = await getSkillOfUser(userId, skillId);
        if (skillOfUser == undefined) {
            return { success: false, errorMessage: `The user ${userId} doesn't have the skill ${skillId}` };
        }

        return { success: true, data: skillOfUser };
    }
);

export const postSkill: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const { descripcion, habilidad } = req.body;
        if (typeof descripcion != "string" && descripcion !== null) {
            return { success: false, errorMessage: "Invalid description" };
        }
        if (typeof habilidad != "string") {
            return { success: false, errorMessage: "Invalid skill" };
        }

        const res = await newSkillOfUser(userId, { description: descripcion, skillName: habilidad });
        return res;
    }
);

export const putSkill: RequestHandler<{ userId: string, skillId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const skillId = req.params.skillId;

        const descripcion = req.body.descripcion;
        if ((typeof descripcion !== "string") && (descripcion != undefined)) {
            return { success: false, errorMessage: `Invalid description` };
        }

        const res = await updateSkillOfUser({ userId, skillName: skillId }, descripcion || null);
        return res;
    }
);

export const deleteSkill: RequestHandler<{ userId: string, skillId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const skillId = req.params.skillId;

        const res = deleteSkillOfUser({ userId, skillName: skillId });
        return res;
    }
);
