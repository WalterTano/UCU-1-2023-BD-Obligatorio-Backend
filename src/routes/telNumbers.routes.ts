import { RequestHandler, Router } from "express";
import * as controller from "../controllers/telNumbers.controller";

const router = Router();
const BASE_ROUTE = '/users/:userId/telNumbers';

router.get(BASE_ROUTE, controller.getTelNumbers);
router.post(BASE_ROUTE, controller.postTelNumbers);
router.delete(BASE_ROUTE, controller.deleteTelNumbers);

export const telNumbersRouter: RequestHandler<{userId: string}> = router;
