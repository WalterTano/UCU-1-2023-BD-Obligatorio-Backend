import { RequestHandler } from "express";
import { getUsers as getUsersModel } from "../models/user";


export const getUsers: RequestHandler = async (req, res) => {
    const users = await getUsersModel();
    res.send(users);
};

export const getUser: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postUser: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putUser: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteUser: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
