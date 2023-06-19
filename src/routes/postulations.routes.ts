import { RequestHandler, Router } from "express";
import * as controller from "../controllers/postulations.controller";

const router = Router();
const BASE_ROUTE = '/postulations';

router.get(BASE_ROUTE, controller.getPostulations);

router.get(`${BASE_ROUTE}/:necessityId/:userId`, controller.getPostulation);

router.post(BASE_ROUTE, controller.postPostulation);

router.put(`${BASE_ROUTE}/:necessityId/:userId`, controller.putPostulation);

router.delete(`${BASE_ROUTE}/:necessityId/:userId`, controller.deletePostulation);

export const postulationRouter: RequestHandler = router;
