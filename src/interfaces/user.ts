import { GeoConfig } from "./geoConfig";
import { LocalGeolocation } from "./localGeolocation";

export const dbUserColumns: (keyof DbUser)[] = [
    "ci", "nombre", "geo_dist", "geo_estado", "is_admin",
    "pais", "departamento", "ciudad", "direccion", "latitud", "longitud"
];

export interface DbUser {
    readonly ci: number,
    nombre: string,
    email: string,
    geo_dist: number,
    geo_estado: boolean,
    is_admin: boolean,
    pais: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    latitud: number | null,
    longitud: number | null
}

export interface User {
    id: number,
    name: string,
    email: string,
    isAdmin: boolean,
    address: LocalGeolocation,
    geoConfig: GeoConfig
}

export function localGeolocationFromDb(info: Pick<DbUser, "pais" | "departamento" | "ciudad" | "direccion" | "latitud" | "longitud">): LocalGeolocation {
    return {
        country: info.pais,
        city: info.ciudad,
        province: info.departamento,
        streetAddress: info.direccion,
        latitude: info.latitud || undefined,
        longitude: info.longitud || undefined
    };
}

export function geoConfigFromDb(info: Pick<DbUser, "geo_dist" | "geo_estado">): GeoConfig {
    return {
        active: info.geo_estado,
        maxDistance: info.geo_dist
    };
}

export function userFromDb(info: DbUser): User {
    return {
        id: info.ci,
        name: info.nombre,
        email: info.email,
        isAdmin: info.is_admin,
        address: localGeolocationFromDb(info),
        geoConfig: geoConfigFromDb(info)
    };
}

export function localGeolocationToDb(info: LocalGeolocation): Pick<DbUser, "pais" | "departamento" | "ciudad" | "direccion" | "latitud" | "longitud"> {
    return {
        pais: info.country,
        departamento: info.province,
        ciudad: info.city,
        direccion: info.streetAddress,
        latitud: info.latitude || null,
        longitud: info.longitude || null
    };
}

export function partialLocalGeolocationToDb(info?: Partial<LocalGeolocation>): Partial<Pick<DbUser, "pais" | "departamento" | "ciudad" | "direccion" | "latitud" | "longitud">> {
    return {
        pais: info?.country,
        departamento: info?.province,
        ciudad: info?.city,
        direccion: info?.streetAddress,
        latitud: info?.latitude,
        longitud: info?.longitude
    };
}

export function geoConfigToDb(info: GeoConfig): Pick<DbUser, "geo_dist" | "geo_estado"> {
    return {
        geo_estado: info.active,
        geo_dist: info.maxDistance
    };
}

export function partialGeoConfigToDb(info?: Partial<GeoConfig>): Partial<Pick<DbUser, "geo_dist" | "geo_estado">> {
    return {
        geo_estado: info?.active,
        geo_dist: info?.maxDistance
    };
}

export function userToDb(info: User): DbUser {
    return {
        ci: info.id,
        nombre: info.name,
        email: info.email,
        is_admin: info.isAdmin,
        ...localGeolocationToDb(info.address),
        ...geoConfigToDb(info.geoConfig)
    };
}

export function partialUserToDb(info: Omit<Partial<User>, "id">): Partial<DbUser> {
    return {
        nombre: info.name,
        email: info.email,
        is_admin: info.isAdmin,
        ...partialLocalGeolocationToDb(info.address),
        ...partialGeoConfigToDb(info.geoConfig)
    };
}
