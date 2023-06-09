import { Handler } from "./lib";

export const getNotifications: Handler<[]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getNotification: Handler<["notifId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postNotification: Handler<[]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putNotification: Handler<["notifId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNotification: Handler<["notifId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
