import { Router } from "express";
import * as controller from "../controllers/notifications.controller";

/*
(Recurso)
Notificacion:
	Id, Usuario(Id) (DELETE -> CASCADE)
	Mensaje
	Fecha
*/

const BASE_ROUTE = '/notifs';
const router = Router();

router.get(BASE_ROUTE, controller.getNotifications);

router.get(`${BASE_ROUTE}/:notifId`, controller.getNotification);

router.post(BASE_ROUTE, controller.postNotification);

router.put(`${BASE_ROUTE}/:notifId`, controller.putNotification);

router.delete(`${BASE_ROUTE}/:notifId`, controller.deleteNotification);

export { router as notifsRouter };
