import { RequestHandler } from "express";
import { getUsers as getUsersModel } from "../models/user";

export const getSkills: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getSkill: RequestHandler<{userId: string, skId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postSkill: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putSkill: RequestHandler<{userId: string, skId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteSkill: RequestHandler<{userId: string, skId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
