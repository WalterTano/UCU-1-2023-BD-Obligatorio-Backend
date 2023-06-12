import { encrypt } from "../helpers/crypt";
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
    hashpwd: string
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

export async function userTemplateToDb(info: UserTemplate): Promise<DbUserTemplate> {
    return {
        ci: info.id,
        nombre: info.name,
        email: info.email,
        is_admin: info.isAdmin,
        ...geoConfigToDb(info.geoConfig),
        ...localGeolocationToDb(info.address),
        hashpwd: await encrypt(info.password)
    };
}
