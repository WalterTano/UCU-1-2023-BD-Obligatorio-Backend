import { User } from '../interfaces/user';
import dbConn from "../configs/db.config";

export async function getUsers(): Promise<User[]> {
    const sqlRes = await dbConn.select({
        table: "usuario",
        columns: [
            "ci",
            "nombre",
            "apellido",
            "email",
            "geo_dist",
            "geo_estado",
            "is_admin",
            "ciudad",
            "departamento",
            "direccion"
        ]
    });

    if (!sqlRes.success) {
        // TODO, mejorar manejo de errores
        throw new Error(sqlRes.errorMsg);
    }

    return sqlRes.data;
}

export async function getPassword(username: string): Promise<string> {
    throw new Error("Not implemented yet");
}

export async function findByCredentials(username: string, hashpwd: string): Promise<User> {
    throw new Error("Not implemented yet");
}

export async function findByUsername(username: string): Promise<User> {
    throw new Error("Not implemented yet");
}

// The password does not go with the User object in this layer
export async function newUser(user: User, hashpwd: string): Promise<void> {
    throw new Error("Not implemented yet");
}

export async function updateUser(ci: number, user: User): Promise<"Success" | "Not found"> {
    throw new Error("Not implemented yet");
}

export async function deleteUser(ci: number): Promise<"Success" | "Not found"> {
    throw new Error("Not implemented yet");
}
