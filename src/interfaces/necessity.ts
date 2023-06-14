import { LocalGeolocation } from "./localGeoLocation";

export interface DbNecessity {
    id: number,
    ci_creador: number,
    descripcion: string,
    estado: string,
    lat_ubicacion: number | null,
    long_ubicacion: number | null,
    pais: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    fecha_creacion: Date,
    fecha_inicio: Date,
    fecha_fin: Date | null,
    fecha_solucionada: Date | null,
    titulo: string
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
            latitude: info.lat_ubicacion,
            longitude: info.long_ubicacion,
            country: info.pais,
            province: info.departamento,
            city: info.ciudad,
            streetAddress: info.direccion
        }
    };
}

export function necessityToDb(info: Necessity): DbNecessity {
    return {
        id: info.id,
        ci_creador: info.userId,
        descripcion: info.description,
        estado: info.status,
        lat_ubicacion: info.location.latitude || null,
        long_ubicacion: info.location.longitude || null,
        pais: info.location.country,
        departamento: info.location.province,
        ciudad: info.location.city,
        direccion: info.location.streetAddress,
        fecha_creacion: info.createdDate,
        fecha_inicio: info.startDate,
        fecha_fin: info.endDate,
        fecha_solucionada: info.solvedDate,
        titulo: info.title
    };
}
