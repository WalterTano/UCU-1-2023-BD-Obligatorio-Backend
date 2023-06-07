import { Router } from "express";
import { getUsers, getUser, postUser, putUser } from "../controllers/users.controller";
import { deleteUser } from "../models/user";

const BASE_ROUTE = '/users';
const router = Router();

router.get(BASE_ROUTE, getUsers);

router.get(`${BASE_ROUTE}/:id`, getUser);

router.post(BASE_ROUTE, postUser);

router.put(`${BASE_ROUTE}/:id`, putUser);

router.delete(`${BASE_ROUTE}/:id`, deleteUser);

export { router as usersRouter };
