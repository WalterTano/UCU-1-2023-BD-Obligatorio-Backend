import { User } from '../interfaces/user';
import dbConn from "../configs/db.config";
import { UserTemplate } from '../interfaces/userTemplate';
import { Result } from '../types/result';
import bcrypt from 'bcryptjs';
import { throwIfUndef } from '../lib';
import { PutBucketEncryptionRequestFilterSensitiveLog } from '@aws-sdk/client-s3';

const BCRYPT_SALT = throwIfUndef(process.env.BCRYPT_SALT, "BCRYPT_SALT");

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
        throw new Error(sqlRes.errorMessage);
    }

    return sqlRes.data;
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

    if (!sqlRes.success) {
        // TODO, mejorar manejo de errores
        throw new Error(sqlRes.errorMessage);
    }

    return sqlRes.data[0];
}

export async function newUser(user: UserTemplate): Promise<Result<void>> {
    const password = user.password;

    const temp: any = {...user};
    delete temp.password;

    const hashpwd = await bcrypt.hash(password, BCRYPT_SALT);
    temp.hashpwd = hashpwd;

    return await dbConn.insert({
        table: "usuario",
        values: temp
    });
}

// It's not the same that an object has no attribute,
// or that it has that attribute with the value 'undefined'
export async function updateUser(ci: number, user: Omit<Partial<User>, "ci">): Promise<Result<number | undefined>> {
    if (Object.keys(user).length <= 0) {
        return { success: true, data: undefined };
    }

    return await dbConn.update({
        table: "usuario",
        values: user,
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
