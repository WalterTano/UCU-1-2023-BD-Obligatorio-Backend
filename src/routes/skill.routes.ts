import { RequestHandler, Router } from "express";
import { deleteSkill, getSkill, getSkills, postSkill, putSkill } from "../controllers/skils.controller";


const router = Router();
const BASE_ROUTE = '/skills';

router.get(BASE_ROUTE, getSkills);

router.get(`${BASE_ROUTE}/:necId`, getSkill);

router.post(BASE_ROUTE, postSkill);

router.put(`${BASE_ROUTE}/:necId`, putSkill);

router.delete(`${BASE_ROUTE}/:necId`, deleteSkill);

export const skillRouter: RequestHandler<{id: string}> = router;
