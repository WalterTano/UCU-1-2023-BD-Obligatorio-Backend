import { RequestHandler, Router } from "express";
import * as controller from "../controllers/requirements.controller";

const router = Router();
const BASE_ROUTE = '/necessities/:necessityId/skills';

router.get(BASE_ROUTE, controller.getRequirements);

router.get(`${BASE_ROUTE}/:skillId`, controller.getRequirement);

router.post(BASE_ROUTE, controller.postRequirement);

router.delete(`${BASE_ROUTE}/:skillId`, controller.deleteRequirement);

export const necessityRouter: RequestHandler<{userId: string}> = router;
