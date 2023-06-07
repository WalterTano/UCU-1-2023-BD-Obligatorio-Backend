import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/users.controller";

const BASE_ROUTE = '/users';
const router = Router();

router.get(BASE_ROUTE, getUsers);

router.get(`${BASE_ROUTE}/:id`, getUser);

router.post(BASE_ROUTE, postUser);

router.put(`${BASE_ROUTE}/:id`, putUser);

router.delete(`${BASE_ROUTE}/:id`, deleteUser);

export { router as usersRouter };
