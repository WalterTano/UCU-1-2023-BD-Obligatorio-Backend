import 'dotenv/config';
import express from 'express';
import { authRouter } from './routes/auth.routes';
import { throwIfUndef } from "./lib";

const PORT = throwIfUndef(process.env.PORT, "PORT");
const app = express();

app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/env", (req, res) => {
    res.json(process.env.NODE_ENV);
});

app.listen(PORT, () => console.log("Listening on port " + PORT));
