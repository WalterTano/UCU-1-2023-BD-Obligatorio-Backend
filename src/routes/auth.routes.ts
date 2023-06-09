import { Router } from "express";
import { doAuth, renewToken } from "../controllers/auth.controller";
import { validateJWT } from "../middlewares/validateJWT.middleware";

const BASE_ROUTE = '/auth';
const authRouter = Router();

authRouter.post(BASE_ROUTE, doAuth);

authRouter.get(`${BASE_ROUTE}/renew`, validateJWT, renewToken);

export { authRouter };
