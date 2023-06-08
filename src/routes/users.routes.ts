import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/users.controller";
import { necessityRouter } from "./necessity.routes";
import { skillRouter } from "./skill.routes";

const BASE_ROUTE = '/users';
const router = Router();

router.get(BASE_ROUTE, getUsers);

router.use(`${BASE_ROUTE}/:id`, necessityRouter);
router.use(`${BASE_ROUTE}/:id`, skillRouter);

router.get(`${BASE_ROUTE}/:id`, getUser);

router.post(BASE_ROUTE, postUser);

router.put(`${BASE_ROUTE}/:id`, putUser);

router.delete(`${BASE_ROUTE}/:id`, deleteUser);

export { router as usersRouter };
