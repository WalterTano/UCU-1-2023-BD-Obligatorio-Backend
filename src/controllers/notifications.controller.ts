import { RequestHandler } from "express";
import { getUsers as getUsersModel } from "../models/user";


export const getNotifications: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getNotification: RequestHandler<{notifId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postNotification: RequestHandler = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putNotification: RequestHandler<{notifId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNotification: RequestHandler<{notifId: string}> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
