import { RequestHandler, Router } from "express";
import { deleteSkill, getSkill, getSkills, postSkill, putSkill } from "../controllers/skills.controller";


const router = Router();
const BASE_ROUTE = '/users/:userId/skills';

router.get(BASE_ROUTE, getSkills);

router.get(`${BASE_ROUTE}/:skId`, getSkill);

router.post(BASE_ROUTE, postSkill);

router.put(`${BASE_ROUTE}/:skId`, putSkill);

router.delete(`${BASE_ROUTE}/:skId`, deleteSkill);

export const skillRouter: RequestHandler<{userId: string}> = router;
