import { RequestHandler } from "express";
import { getUsers as getUsersModel } from "../models/user";


export const getNecessities: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getNecessity: RequestHandler<{id: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postNecessity: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putNecessity: RequestHandler<{id: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNecessity: RequestHandler<{id: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
