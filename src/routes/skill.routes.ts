import { RequestHandler, Router } from "express";
import { deleteSkill, getSkillByUser, getSkills, getSkillsByUser, postSkill, putSkill } from "../controllers/skills.controller";


const router = Router();

const BASE_ROUTE = '/skills';

router.get(BASE_ROUTE, getSkills);

const USER_LINKED_BASE_ROUTE = '/users/:userId/skills';

router.get(USER_LINKED_BASE_ROUTE, getSkillsByUser);

router.get(`${USER_LINKED_BASE_ROUTE}/:skillId`, getSkillByUser);

router.post(USER_LINKED_BASE_ROUTE, postSkill);

router.put(`${USER_LINKED_BASE_ROUTE}/:skillId`, putSkill);

router.delete(`${USER_LINKED_BASE_ROUTE}/:skillId`, deleteSkill);

export const skillsRouter: RequestHandler<{userId: string}> = router;
