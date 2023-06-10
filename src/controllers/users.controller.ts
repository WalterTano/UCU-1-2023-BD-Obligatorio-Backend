import { RequestHandler } from "express";
import { getUsers as getUsersModel, newUser } from "../models/user";
import { checkUserTemplate } from "../helpers/userTemplate";


export const getUsers: RequestHandler = async (req, res) => {
    const users = await getUsersModel();
    res.send(users);
};

export const getUser: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postUser: RequestHandler = async (req, res) => {
    const input = req.body;

    if (!checkUserTemplate(input)) {
        res.status(400).send("Invalid data");
        return;
    }

    const result = await newUser(input);
    if (result.success) {
        res.status(200).end();
    } else {
        res.status(500).send(result.errorMsg);
    }

};

export const putUser: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteUser: RequestHandler<{userId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
