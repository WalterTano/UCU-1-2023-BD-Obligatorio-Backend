import { RequestHandler } from "express";
import { getUsers as getUsersModel } from "../models/user";


export const getNotifs: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getNotif: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postNotif: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putNotif: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNotif: RequestHandler<{id: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
