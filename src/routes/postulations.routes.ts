import { RequestHandler, Router } from "express";
import { deleteSkill, getSkill, getSkills, postSkill, putSkill } from "../controllers/skills.controller";


const router = Router();
const BASE_ROUTE = '/postulations';

router.get(BASE_ROUTE, getSkills);

router.get(`${BASE_ROUTE}/:posId`, getSkill);

router.post(BASE_ROUTE, postSkill);

router.put(`${BASE_ROUTE}/:skId`, putSkill);

router.delete(`${BASE_ROUTE}/:skId`, deleteSkill);

export const postulationRouter: RequestHandler = router;
