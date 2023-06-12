import { RequestHandler } from "express";
import { toRequestHandler } from "../helpers/controllers.helpers";
import { getSkillNames, getSkillsOfUser, newSkillOfUser } from "../models/skill";
import { isNotUndefined } from "../helpers/isNotUndefined";


export const getSkills: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const skillsOfUser = await getSkillsOfUser(userId);
        const skills = await getSkillNames(skillsOfUser.map(s => s.id_hab));

        const data = skillsOfUser.map(skillOfUser => {
            const skill = skills.filter(skill => skill.id == skillOfUser.id_hab).at(0);
            if (skill == undefined) return undefined;
            return { ...skillOfUser, nombre: skill.nombre };
        }).filter(isNotUndefined);

        return { success: true, data };
    }
);

export const getSkill: RequestHandler<{ userId: string, skillId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postSkill: RequestHandler<{ userId: string }> = toRequestHandler(
    async (req) => {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return { success: false, errorMessage: "Invalid CI" };
        }

        const { descripcion, habilidad } = req.body;
        if (typeof descripcion != "string" && typeof descripcion != "undefined") {
            return { success: false, errorMessage: "Invalid description" };
        }
        if (typeof habilidad != "string" && typeof habilidad != "number") {
            return { success: false, errorMessage: "Invalid skill id" };
        }

        const res = await newSkillOfUser(userId, { descripcion, habilidad });
        return { success: true, data: res };
    }
);

export const putSkill: RequestHandler<{ userId: string, skillId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteSkill: RequestHandler<{ userId: string, skillId: string }> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
