import { RequestHandler } from "express";


export const getPostulations: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getPostulation: RequestHandler<{posId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postPostulation: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putPostulation: RequestHandler<{posId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deletePostulation: RequestHandler<{posId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
