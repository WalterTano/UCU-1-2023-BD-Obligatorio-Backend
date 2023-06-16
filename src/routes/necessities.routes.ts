import { RequestHandler, Router } from "express";
import { getNecessitiesByUser, deleteNecessity, getNecessities, getNecessity, postNecessity, putNecessity } from "../controllers/necessities.controller";

const router = Router();
const BASE_ROUTE = '/necessities';

router.get(BASE_ROUTE, getNecessities);

const USER_LINKED_BASE_ROUTE = '/users/:userId/necessities';
router.get(USER_LINKED_BASE_ROUTE, getNecessitiesByUser);

router.get(`${BASE_ROUTE}/:id`, getNecessity);

router.post(BASE_ROUTE, postNecessity);

router.put(`${BASE_ROUTE}/:id`, putNecessity);

router.delete(`${BASE_ROUTE}/:id`, deleteNecessity);

export const necessityRouter: RequestHandler<{userId: string}> = router;
