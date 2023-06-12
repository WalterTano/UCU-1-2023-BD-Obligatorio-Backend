import { RequestHandler, Router } from "express";
import { deleteSkill, getSkill, getSkills, postSkill, putSkill } from "../controllers/skills.controller";


const router = Router();
const BASE_ROUTE = '/users/:userId/skills';

router.get(BASE_ROUTE, getSkills);

router.get(`${BASE_ROUTE}/:skillId`, getSkill);

router.post(BASE_ROUTE, postSkill);

router.put(`${BASE_ROUTE}/:skillId`, putSkill);

router.delete(`${BASE_ROUTE}/:skillId`, deleteSkill);

export const skillsRouter: RequestHandler<{userId: string}> = router;
