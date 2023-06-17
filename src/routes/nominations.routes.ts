import { RequestHandler, Router } from "express";
import { deleteSkill, getSkillByUser, getSkills, postSkill, putSkill } from "../controllers/skills.controller";

const router = Router();
const BASE_ROUTE = '/nominations';

router.get(BASE_ROUTE, getSkills);

router.get(`${BASE_ROUTE}/:posId`, getSkillByUser);

router.post(BASE_ROUTE, postSkill);

router.put(`${BASE_ROUTE}/:skillId`, putSkill);

router.delete(`${BASE_ROUTE}/:skillId`, deleteSkill);

export const postulationRouter: RequestHandler = router;