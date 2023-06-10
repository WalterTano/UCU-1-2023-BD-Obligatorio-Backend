import { UserTemplate } from "../interfaces/userTemplate";

export function checkUserTemplate(v: any): v is UserTemplate {
    return typeof v.ci == "number" &&
        typeof v.nombre == "string" &&
        typeof v.apellido == "string" &&
        typeof v.email == "string" &&
        (!v.geo_dist || typeof v.geo_dist == "number") &&
        (!v.geo_estado || typeof v.geo_estado == "boolean") &&
        (!v.is_admin || typeof v.is_admin == "boolean") &&
        typeof v.ciudad == "string" &&
        typeof v.departamento == "string" &&
        typeof v.direccion == "string" &&
        typeof v.password == "string";
}
