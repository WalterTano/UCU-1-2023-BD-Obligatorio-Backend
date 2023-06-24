import { RequestHandler, Router } from "express";
import * as controller from "../controllers/skillEnum.controller";


const router = Router();

const BASE_ROUTE = '/enumSkills';

router.get(BASE_ROUTE, controller.getSkills);

router.get(`${BASE_ROUTE}/:skillId`, controller.getSkillByName);

export const skillEnumRouter: RequestHandler = router;
