import { GeoConfig } from "./geoConfig";
import { LocalGeolocation } from "./localGeoLocation";
import { geoConfigFromDb, geoConfigToDb, localGeolocationFromDb, localGeolocationToDb } from "./user";

export interface DbUserTemplate {
    readonly ci: number,
    nombre: string,
    email: string,
    geo_dist?: number,
    geo_estado?: boolean,
    is_admin?: boolean,
    pais: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    password: string,
}

export interface UserTemplate {
    id: number,
    name: string,
    email: string,
    isAdmin?: boolean,
    address: LocalGeolocation,
    geoConfig: GeoConfig,
    password: string
}

export function userTemplateFromDb(info: DbUserTemplate): UserTemplate {
    return {
        id: info.ci,
        name: info.nombre,
        email: info.email,
        isAdmin: info.is_admin,
        address: localGeolocationFromDb(info),
        geoConfig: geoConfigFromDb({
            geo_dist: info.geo_dist || 0,
            geo_estado: info.geo_estado || false
        }),
        password: info.password
    };
}

export function userTemplateToDb(info: UserTemplate): DbUserTemplate {
    return {
        ci: info.id,
        nombre: info.name,
        email: info.email,
        is_admin: info.isAdmin,
        ...geoConfigToDb(info.geoConfig),
        ...localGeolocationToDb(info.address),
        password: info.password
    };
}
