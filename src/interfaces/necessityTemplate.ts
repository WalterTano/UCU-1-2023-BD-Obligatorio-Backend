import { LocalGeolocation } from "./localGeoLocation";
import { DbNecessity, Necessity } from "./necessity";

export type DbNecessityTemplate = Omit<DbNecessity, "id" | "fecha_creacion">;

export type NecessityTemplate = Omit<Necessity, "id" | "createdDate">;

export function necessityTemplateToDb(info: NecessityTemplate): DbNecessityTemplate {
    return {
        ci_creador: info.userId,
        descripcion: info.description,
        estado: info.status || 'Pendiente',
        latitud: info.location.latitude,
        longitud: info.location.longitude,
        fecha_inicio: info.startDate,
        fecha_fin: info.endDate || null,
        fecha_solucionada: null,
        titulo: info.title,
    };
}
