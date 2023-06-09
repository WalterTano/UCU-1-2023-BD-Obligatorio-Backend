import { getUsers as getUsersModel } from "../models/user";
import { Handler } from "./lib";

export const getUsers: Handler<[]> = async (req, res) => {
    const users = await getUsersModel();
    res.send(users);
};

export const getUser: Handler<["userId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postUser: Handler<[]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putUser: Handler<["userId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteUser: Handler<["userId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
