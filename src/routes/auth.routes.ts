import { Router } from "express";
import { doAuth, renewToken } from "../controllers/auth.controller";
import { validateJWT } from "../middlewares/validateJWT.middleware";

const BASE_ROUTE = '/auth';
const authRouter = Router();

authRouter.post(BASE_ROUTE, async (req, res, next) => {
    return doAuth(req, res, next);
});

authRouter.get(`${BASE_ROUTE}/renew`, validateJWT, async (req, res, next) => {
    return renewToken(req, res, next);
});

export { authRouter };
