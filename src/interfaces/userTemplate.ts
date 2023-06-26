import { encrypt } from "../helpers/crypt";
import { GeoConfig } from "./geoConfig";
import { LocalGeolocation } from "./localGeoLocation";

export interface DbUserTemplate {
    ci: number,
    nombre: string,
    apellido: string,
    email: string,
    geo_distancia: number,
    geo_activado: boolean,
    es_admin: boolean,
    latitud: number,
    longitud: number,
    hashpwd: string
}

export interface UserTemplate {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean | null,
    address: LocalGeolocation,
    geoConfiguration: GeoConfig | null,
    password: string,
    phoneNumbers?: number[]
}

export async function userTemplateToDb(info: UserTemplate): Promise<{ info: DbUserTemplate, numbers?: number[] }> {
    return {
        info: {
            ci: info.id,
            nombre: info.firstName,
            apellido: info.lastName,
            email: info.email,
            es_admin: info.isAdmin || false,
            geo_activado: info.geoConfiguration?.active || false,
            geo_distancia: info.geoConfiguration?.maxDistance || 0,
            hashpwd: await encrypt(info.password),
            latitud: info.address.latitude,
            longitud: info.address.longitude
        },
        numbers: info.phoneNumbers
    };
}
