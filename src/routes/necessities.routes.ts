import { RequestHandler, Router } from "express";
import * as controller from "../controllers/necessities.controller";

const router = Router();
const BASE_ROUTE = '/necessities';

router.get(BASE_ROUTE, controller.getNecessities);

const USER_LINKED_BASE_ROUTE = '/users/:userId/necessities';
router.get(USER_LINKED_BASE_ROUTE, controller.getNecessitiesByUser);

router.get(`${BASE_ROUTE}/:id`, controller.getNecessity);

router.post(BASE_ROUTE, controller.postNecessity);

router.put(`${BASE_ROUTE}/:id`, controller.putNecessity);

router.delete(`${BASE_ROUTE}/:id`, controller.deleteNecessity);

export const necessityRouter: RequestHandler<{userId: string}> = router;
