import { Handler } from "./lib";

export const getSkills: Handler<["userId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getSkill: Handler<["userId", "skillId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postSkill: Handler<["userId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putSkill: Handler<["userId", "skillId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteSkill: Handler<["userId", "skillId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
