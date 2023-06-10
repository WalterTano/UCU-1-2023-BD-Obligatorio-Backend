import { RequestHandler } from "express";
import { getUsers as getUsersModel, deleteUser as deleteUserModel } from "../models/user";


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
    res.status(500).send("Not implemented yet");
};

export const deleteUser: RequestHandler<{userId: string}> = async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).send("Invalid CI");
    }

    const result = await deleteUserModel(userId);
    if (!result.success) {
        res.status(500).send(result.errorMsg);
    } else if (result.data) {
        res.status(200).send("Done");
    } else {
        res.status(200).send("No changes made");
    }
};
