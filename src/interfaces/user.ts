import { GeoConfig } from "./geoConfig";
import { LocalGeolocation } from "./localGeoLocation";

export const dbUserColumns: (keyof DbUser)[] = [
    "ci", "nombre", "apellido", "email", "geo_distancia",
    "geo_activado", "es_admin", "latitud", "longitud"
];

export interface DbUser {
    ci: number,
    nombre: string,
    apellido: string,
    email: string,
    geo_distancia: number,
    geo_activado: boolean,
    es_admin: boolean,
    latitud: number,
    longitud: number
}

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean,
    address: LocalGeolocation,
    geoConfig: GeoConfig
}

export function userFromDb(info: DbUser): User {
    return {
        id: info.ci,
        firstName: info.nombre,
        lastName: info.apellido,
        email: info.email,
        isAdmin: info.es_admin,
        address: {
            latitude: info.latitud,
            longitude: info.longitud
        },
        geoConfig: {
            active: info.geo_activado,
            maxDistance: info.geo_distancia
        }
    };
}

export function userToDb(info: User): DbUser {
    return {
        ci: info.id,
        nombre: info.firstName,
        apellido: info.lastName,
        email: info.email,
        es_admin: info.isAdmin,
        latitud: info.address.latitude,
        longitud: info.address.longitude,
        geo_activado: info.geoConfig.active,
        geo_distancia: info.geoConfig.maxDistance
    }
}
