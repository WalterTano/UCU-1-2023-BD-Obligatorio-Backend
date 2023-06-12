import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { getSkillsById, getSkillById, getSkillOfUser, getSkillsOfUser } from "../models/skill";
import { isNotUndefined } from "../helpers/isNotUndefined";

export const getSkills: RequestHandler = toRequestHandler(
    async (req)
);

export const getSkillsByUser: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const skillsOfUser = await getSkillsOfUser(userId);
        const skills = await getSkillsById(skillsOfUser.map(s => s.id_hab));

        const data = skillsOfUser.map(skillOfUser => {
            const skill = skills.filter(skill => skill.id == skillOfUser.id_hab).at(0);
            if (skill == undefined) return undefined;
            return { ...skillOfUser, nombre: skill.nombre };
        }).filter(isNotUndefined);

        return { success: true, data };
    }
);

export const getSkill: RequestHandler<{ userId: string, skillId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const skillId = parseInt(req.params.skillId);
        if (isNaN(skillId)) {
            return { success: false, errorMessage: "Invalid skill id" };
        }

        const skillOfUser = await getSkillOfUser(userId, skillId);
        if (skillOfUser == undefined) {
            return { success: false, errorMessage: `The user ${userId} doesn't have the skill ${skillId}` };
        }

        const skill = await getSkillById(skillId);
        if (skill == undefined) {
            return { success: false, errorMessage: `The user ${userId} doesn't have the skill ${skillId}` };
        }

        return {
            success: true,
            data: { ...skillOfUser, nombre: skill.nombre }
        };
    }
);

export const postSkill: RequestHandler<{ userId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putSkill: RequestHandler<{ userId: string, skillId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteSkill: RequestHandler<{ userId: string, skillId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
