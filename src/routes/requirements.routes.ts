import { RequestHandler, Router } from "express";
import * as controller from "../controllers/requirements.controller";

const router = Router();
const BASE_ROUTE = '/necessities/:necessityId/skills';

router.get(BASE_ROUTE, controller.getRequirements);

router.post(BASE_ROUTE, controller.postRequirements);

router.post(`${BASE_ROUTE}/delete`, controller.deleteRequirements);

router.delete(`${BASE_ROUTE}/:skillId`, controller.deleteRequirement);

export const requirementRouter: RequestHandler<{userId: string}> = router;
