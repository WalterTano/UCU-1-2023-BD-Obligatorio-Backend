import { Router } from "express";
import * as controller from "../controllers/users.controller";
import { validateJWT } from "../middlewares/validateJWT.middleware";

const BASE_ROUTE = '/users';
const router = Router();

router.get(BASE_ROUTE, validateJWT, controller.getUsers);

router.get(`${BASE_ROUTE}/:userId`, validateJWT, controller.getUser);

router.post(BASE_ROUTE, controller.postUser);

router.put(`${BASE_ROUTE}/:userId`, validateJWT, controller.putUser);

router.delete(`${BASE_ROUTE}/:userId`, validateJWT, controller.deleteUser);

export { router as usersRouter };
