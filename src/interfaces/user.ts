import { GeoConfig } from "./geoConfig";
import { LocalGeolocation } from "./localGeoLocation";

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
    geoConfiguration: GeoConfig,
    phoneNumbers?: number[]
}

export function userFromDb(info: DbUser, numbers: number[]): User {
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
        geoConfiguration: {
            active: info.geo_activado,
            maxDistance: info.geo_distancia
        },
        phoneNumbers: numbers
    };
}

export function userToDb(info: User): { info: DbUser, numbers?: number[] } {
    return {
        info: {
            ci: info.id,
            nombre: info.firstName,
            apellido: info.lastName,
            email: info.email,
            es_admin: info.isAdmin,
            latitud: info.address.latitude,
            longitud: info.address.longitude,
            geo_activado: info.geoConfiguration.active,
            geo_distancia: info.geoConfiguration.maxDistance
        },
        numbers: info.phoneNumbers
    }
}
