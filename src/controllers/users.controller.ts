import { RequestHandler } from "express";
import { getUsers as getUsersModel, updateUser } from "../models/user";


export const getUsers: RequestHandler = async (req, res) => {
    const users = await getUsersModel();
    res.send(users);
};

export const getUser: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postUser: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putUser: RequestHandler<{userId: string}> = async (req, res) => {
    const userCI = parseInt(req.params.userId);
    if (isNaN(userCI)) {
        return res.status(400).send("Invalid CI");
    }

    const result = await updateUser(userCI, req.body);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
};

export const deleteUser: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
