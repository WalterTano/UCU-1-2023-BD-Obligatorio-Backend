import { Router } from "express";
import { deleteNotif, getNotif, getNotifs, postNotif, putNotif } from "../controllers/notifs.controller";

/*
(Recurso)
Notificacion:
	Id, Usuario(Id) (DELETE -> CASCADE)
	Mensaje
	Fecha
*/

const BASE_ROUTE = '/notifs';
const router = Router();

router.get(BASE_ROUTE, getNotifs);

router.get(`${BASE_ROUTE}/:id`, getNotif);

router.post(BASE_ROUTE, postNotif);

router.put(`${BASE_ROUTE}/:id`, putNotif);

router.delete(`${BASE_ROUTE}/:id`, deleteNotif);

export { router as notifsRouter };
