import { RequestHandler } from "express";
import { getUsers as getUsersModel } from "../models/user";

export const getSkills: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getSkill: RequestHandler<{id: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postSkill: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putSkill: RequestHandler<{id: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteSkill: RequestHandler<{id: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
