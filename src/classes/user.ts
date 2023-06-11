/*
(Recurso)
Usuario:
	CI
    username (único)
	Departamento (Nombre)
    Contraseña (almacenar aparte)
	Nombres
	Apellidos
	Medios de contacto
	Foto CI (almacenar aparte)
	Geo distancia
	Geo estado
	¿Es admin?

(Sub-objeto)
Medios de contacto:
	Direcciones
	Teléfonos
	Emails
*/

type Address = string;
type Telephone = string;
type Email = string;

type Contact = {addr: Address} | {tel: Telephone} | {email: Email};

export class User {

    public constructor(
        public readonly ci: number,
        public username: string,
        public department: string,
        public firstNames: string,
        public lastNames: string,
        public geoDistance: number,
        public geoState: boolean,
        public isAdmin: boolean,
        public contacts: Contact[]
    ) {}

}
