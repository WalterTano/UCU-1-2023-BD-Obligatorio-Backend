import { RequestHandler } from "express";


export const getNominations: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getNomination: RequestHandler<{posId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postNomination: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putNomination: RequestHandler<{posId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNomination: RequestHandler<{posId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
