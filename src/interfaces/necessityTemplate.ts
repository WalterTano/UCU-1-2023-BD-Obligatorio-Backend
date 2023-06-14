import { LocalGeolocation } from "./localGeoLocation";
import { DbNecessity, Necessity } from "./necessity";

// TODO: Change other templates' declaration to this format
export type DbNecessityTemplate = Omit<DbNecessity, "id" | "fecha_creacion">;

export type  NecessityTemplate = Omit<Necessity, "id" | "creationDate">;

export function necessityTemplateToDb(info: NecessityTemplate): DbNecessityTemplate {
    return {
        ci_creador: info.userId,
        descripcion: info.description,
        estado: info.status,
        lat_ubicacion: info.location.latitude,
        long_ubicacion: info.location.longitude,
        pais: info.location.country,
        departamento: info.location.province,
        ciudad: info.location.city,
        direccion: info.location.streetAddress,
        fecha_inicio: info.startDate,
        fecha_fin: info.endDate,
        fecha_solucionada: info.solvedDate,
        titulo: info.title
    };
}
