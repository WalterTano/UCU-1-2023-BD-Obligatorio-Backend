import { RequestHandler } from "express";
import { findByCI, getUsers as getUsersModel } from "../models/user";


export const getUsers: RequestHandler = async (_req, res) => {
    const users = await getUsersModel();
    res.json(users);
};

export const getUser: RequestHandler<{userId: string}> = async (req, res) => {
    const userId = req.params.userId;
    const user = await findByCI(userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
};

export const postUser: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putUser: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteUser: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
