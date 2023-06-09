import { RequestHandler } from "express";


export const getNecessities: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getNecessity: RequestHandler<{userId: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postNecessity: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putNecessity: RequestHandler<{userId: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNecessity: RequestHandler<{userId: string, necId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
