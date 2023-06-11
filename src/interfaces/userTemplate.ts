export interface User {
    readonly ci: number,
    nombre: string,
    apellido: string,
    email: string,
    geo_dist?: number,
    geo_estado?: boolean,
    is_admin?: boolean,
    ciudad: string,
    departamento: string,
    direccion: string,
    hashpwd: string,
}
