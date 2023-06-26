import { RequestHandler, Router } from "express";
import * as controller from "../controllers/skills.controller";


const router = Router();

const BASE_ROUTE = '/skills';

router.get(BASE_ROUTE, controller.getSkills);

const USER_LINKED_BASE_ROUTE = '/users/:userId/skills';

router.get(USER_LINKED_BASE_ROUTE, controller.getSkillsByUser);

router.get(`${USER_LINKED_BASE_ROUTE}/:skillId`, controller.getSkillByUser);

router.post(USER_LINKED_BASE_ROUTE, controller.postSkills);

router.put(`${USER_LINKED_BASE_ROUTE}/:skillId`, controller.putSkill);

router.delete(`${USER_LINKED_BASE_ROUTE}/:skillId`, controller.deleteSkill);

router.delete(USER_LINKED_BASE_ROUTE, controller.deleteSkills);

export const skillsRouter: RequestHandler<{userId: string}> = router;
