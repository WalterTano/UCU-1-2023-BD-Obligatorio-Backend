import { LocalGeolocation } from "./localGeoLocation";

export interface DbNecessityTemplate {
    ci_creador: number,
    descripcion: string,
    estado: string,
    lat_ubicacion: number | null,
    long_ubicacion: number | null,
    pais: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    fecha_inicio: Date,
    fecha_fin: Date | null,
    fecha_solucionada: Date | null,
    titulo: string
}

export interface NecessityTemplate {
    userId: number,
    description: string,
    state: string,
    startDate: Date,
    endDate?: Date | null,
    solvedDate?: Date | null,
    title: string,
    location: LocalGeolocation
}

export function necessityTemplateToDb(info: NecessityTemplate): DbNecessityTemplate {
    return {
        ci_creador: info.userId,
        descripcion: info.description,
        estado: info.state,
        lat_ubicacion: info.location.latitude || null,
        long_ubicacion: info.location.longitude || null,
        pais: info.location.country,
        departamento: info.location.province,
        ciudad: info.location.city,
        direccion: info.location.streetAddress,
        fecha_inicio: info.startDate,
        fecha_fin: info.endDate || null,
        fecha_solucionada: info.solvedDate || null,
        titulo: info.title
    };
}
