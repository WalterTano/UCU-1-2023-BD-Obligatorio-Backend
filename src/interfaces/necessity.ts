import { LocalGeolocation } from "./localGeoLocation";

export interface DbNecessity {
    id: number,
    ci_creador: number,
    titulo: string,
    descripcion: string,
    estado: string,
    fecha_creacion: Date,
    latitud: number,
    longitud: number,
    fecha_inicio: Date,
    fecha_fin: Date | null,
    fecha_solucionada: Date | null,
}

export interface Necessity {
    id: number,
    userId: number,
    title: string,
    description: string,
    status: string,
    createdDate: Date,
    startDate: Date,
    endDate: Date | null,
    solvedDate: Date | null,
    location: LocalGeolocation
}

export function necessityFromDb(info: DbNecessity): Necessity {
    return {
        id: info.id,
        userId: info.ci_creador,
        title: info.titulo,
        description: info.descripcion,
        status: info.estado,
        createdDate: info.fecha_creacion,
        startDate: info.fecha_inicio,
        endDate: info.fecha_fin,
        solvedDate: info.fecha_solucionada,
        location: {
            latitude: info.latitud,
            longitude: info.longitud,
        }
    };
}
