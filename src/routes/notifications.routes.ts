import { Router } from "express";
import {
	deleteNotification,
	getNotification,
	getNotifications,
	postNotification,
	putNotification
} from "../controllers/notifications.controller";

/*
(Recurso)
Notificacion:
	Id, Usuario(Id) (DELETE -> CASCADE)
	Mensaje
	Fecha
*/

const BASE_ROUTE = '/notifs';
const router = Router();

router.get(BASE_ROUTE, getNotifications);

router.get(`${BASE_ROUTE}/:notifId`, getNotification);

router.post(BASE_ROUTE, postNotification);

router.put(`${BASE_ROUTE}/:notifId`, putNotification);

router.delete(`${BASE_ROUTE}/:notifId`, deleteNotification);

export { router as notifsRouter };
