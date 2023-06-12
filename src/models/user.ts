import { DbUser, User, partialUserToDb, userFromDb } from '../interfaces/user';
import dbConn from "../configs/db.config";
import { UserTemplate, userTemplateToDb } from '../interfaces/userTemplate';
import { Result } from '../types/result';
import bcrypt from 'bcryptjs';
import { throwIfUndef } from '../lib';
import { mapResult, unwrapResult } from '../helpers/resultHelpers';

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

    const res: DbUser[] = unwrapResult(sqlRes);
    return res.map(userFromDb);
}

export async function getPassword(ci: string): Promise<string> {
    throw new Error("Not implemented yet");
}

export async function findByCredentials(ci: string, hashpwd: string): Promise<User> {
    throw new Error("Not implemented yet");
}

export async function findByCI(ci: string): Promise<User | undefined> {
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
        ],
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    const res: DbUser | undefined = unwrapResult<DbUser[]>(sqlRes).at(0);

    return res && userFromDb(res);
}

export async function newUser(user: UserTemplate): Promise<Result<number>> {
    const dbUser = await userTemplateToDb(user);

    const result = await dbConn.insert({
        table: "usuario",
        idColumns: ["ci"],
        values: dbUser
    });

    return mapResult(result, data => data.at(0));
}

// It's not the same that an object has no attribute,
// or that it has that attribute with the value 'undefined'
export async function updateUser(ci: number, user: Omit<Partial<User>, "id">): Promise<Result<number | undefined>> {
    if (Object.keys(user).length <= 0) {
        return { success: true, data: undefined };
    }

    const dbUser = partialUserToDb(user);

    return await dbConn.update({
        table: "usuario",
        values: dbUser,
        conditions: [
            {column: "ci", operation: "=", value: ci}
        ]
    });
}

export async function deleteUser(ci: number): Promise<Result<boolean>> {
    const res = await dbConn.delete({
        table: "usuario",
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    return res.success ? { success: true, data: res.data > 0 } : res;
}
