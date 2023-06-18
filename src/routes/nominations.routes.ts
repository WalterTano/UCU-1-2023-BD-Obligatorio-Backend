import { RequestHandler, Router } from "express";
import * as controller from "../controllers/nominations.controller";

const router = Router();
const BASE_ROUTE = '/nominations';

router.get(BASE_ROUTE, controller.getNominations);

router.get(`${BASE_ROUTE}/:necessityId/:userId`, controller.getNomination);

router.post(BASE_ROUTE, controller.postNomination);

router.put(`${BASE_ROUTE}/:necessityId/:userId`, controller.putNomination);

router.delete(`${BASE_ROUTE}/:necessityId/:userId`, controller.deleteNomination);

export const nominationRouter: RequestHandler = router;
