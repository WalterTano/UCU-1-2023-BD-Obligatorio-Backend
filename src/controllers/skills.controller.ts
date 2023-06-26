import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import * as skillModel from "../models/skill";

export const getSkills: RequestHandler = toRequestHandler(
    async (_req) => {
        const skills = await skillModel.getAllSkills();
        return { success: true, data: skills };
    }
);

export const getSkillsByUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const data = await skillModel.getSkillsOfUser(userId);

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

        const skillOfUser = await skillModel.getSkillOfUser(userId, skillId);
        if (skillOfUser == undefined) {
            return { success: false, errorMessage: `The user ${userId} doesn't have the skill ${skillId}` };
        }

        return { success: true, data: skillOfUser };
    }
);

export const postSkills: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        let skills = req.body;
        
        if (!Array.isArray(skills)) {
            skills = [ req.body ];
        }

        const badSkills: any[] = [];
        const newSkills: any[] = [];
        skills.forEach((skill: any) => {
            if (typeof skill.description !== "string" && skill.description !== null) {
                badSkills.push({
                    success: false,
                    skillName: skill.name,
                    descripcion: skill.description,
                    userId: userId,
                    errorMessage: "Invalid description"
                });
                return;
            }
            if (typeof skill.name !== "string") {
                badSkills.push({
                    success: false, 
                    skillName: skill.name,
                    descripcion: skill.description,
                    userId: userId,
                    errorMessage: "Invalid skill"
                });
                return;
            }
            newSkills.push(skill)
        });

        const res = await skillModel.newSkillsOfUser(userId, newSkills);
        if (res.success) {
            res.data = [ res.data, ...badSkills ];
        }

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

        const res = await skillModel.updateSkillOfUser({ userId, skillName: skillId }, descripcion || null);
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

        const res = skillModel.deleteSkillOfUser({ userId, skillName: skillId });
        return res;
    }
);

export const deleteSkills: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        if (!req.body || !Array.isArray(req.body)) {
            return { success: false, errorMessage: "Missing required array field in request's body: skillNames" }
        }

        const res = skillModel.deleteSkillsOfUser(userId, req.body);
        return res;
    }
);