import { RequestHandler, Router } from "express";
import { deleteSkill, getSkill, getSkills, postSkill, putSkill } from "../controllers/skills.controller";

/*
TODO: Determine full path to postulation API
*/

const router = Router();
const BASE_ROUTE = '/postulations';

router.get(BASE_ROUTE, getSkills);

router.get(`${BASE_ROUTE}/:posId`, getSkill);

router.post(BASE_ROUTE, postSkill);

router.put(`${BASE_ROUTE}/:skillId`, putSkill);

router.delete(`${BASE_ROUTE}/:skillId`, deleteSkill);

export const postulationRouter: RequestHandler = router;
