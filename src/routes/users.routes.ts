import { Router } from "express";
import * as controller from "../controllers/users.controller";

const BASE_ROUTE = '/users';
const router = Router();

router.get(BASE_ROUTE, controller.getUsers);

router.get(`${BASE_ROUTE}/:userId`, controller.getUser);

router.post(BASE_ROUTE, controller.postUser);

router.put(`${BASE_ROUTE}/:userId`, controller.putUser);

router.delete(`${BASE_ROUTE}/:userId`, controller.deleteUser);

export { router as usersRouter };
