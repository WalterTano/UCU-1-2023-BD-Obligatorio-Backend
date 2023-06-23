import { Router } from "express";
import * as controller from "../controllers/notifications.controller";

/*
(Recurso)
Notificacion:
	Id, Usuario(Id) (DELETE -> CASCADE)
	Mensaje
	Fecha
*/

const BASE_ROUTE = '/notifications';
const router = Router();

router.get(BASE_ROUTE, controller.getNotifications);

router.get(`${BASE_ROUTE}/:notificationId`, controller.getNotification);

router.post(BASE_ROUTE, controller.postNotification);

router.put(`${BASE_ROUTE}/:notificationId`, controller.putNotification);

router.delete(`${BASE_ROUTE}/:notificationId`, controller.deleteNotification);

export { router as notificationRouter };
