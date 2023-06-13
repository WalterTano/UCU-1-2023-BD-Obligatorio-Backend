import { RequestHandler, Router } from "express";
import { deleteNecessity, getNecessitiesByUser, getNecessity, postNecessity, putNecessity } from "../controllers/necessities.controller";

const router = Router();
const BASE_ROUTE = '/users/:userId/necessities';

router.get(BASE_ROUTE, getNecessitiesByUser);

router.get(`${BASE_ROUTE}/:necId`, getNecessity);

router.post(BASE_ROUTE, postNecessity);

router.put(`${BASE_ROUTE}/:necId`, putNecessity);

router.delete(`${BASE_ROUTE}/:necId`, deleteNecessity);

export const necessityRouter: RequestHandler<{userId: string}> = router;
