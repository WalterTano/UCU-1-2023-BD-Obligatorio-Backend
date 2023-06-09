import { Handler } from "./lib";

export const getNecessities: Handler<["userId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const getNecessity: Handler<["userId", "necId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const postNecessity: Handler<["userId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const putNecessity: Handler<["userId", "necId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};

export const deleteNecessity: Handler<["userId", "necId"]> = async (req, res) => {
    res.status(500).send("Not implemented yet");
};
