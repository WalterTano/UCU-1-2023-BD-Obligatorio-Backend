import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/users.controller";
import { necessityRouter } from "./necessity.routes";
import { skillRouter } from "./skill.routes";
import { postulationRouter } from "./postulations.routes";

const BASE_ROUTE = '/users';
const router = Router();

router.get(BASE_ROUTE, getUsers);

router.use(`${BASE_ROUTE}/:userId`, necessityRouter);
router.use(`${BASE_ROUTE}/:userId`, skillRouter);
router.use(`${BASE_ROUTE}/:userId`, postulationRouter);

router.get(`${BASE_ROUTE}/:userId`, getUser);

router.post(BASE_ROUTE, postUser);

router.put(`${BASE_ROUTE}/:userId`, putUser);

router.delete(`${BASE_ROUTE}/:userId`, deleteUser);

export { router as usersRouter };
