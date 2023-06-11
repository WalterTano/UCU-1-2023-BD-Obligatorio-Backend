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
        throw new Error(sqlRes.errorMsg);
    }

    return sqlRes.data;
}

export async function getPassword(ci: number): Promise<string> {
    throw new Error("Not implemented yet");
}

export async function findByCredentials(ci: number, hashpwd: string): Promise<User> {
    throw new Error("Not implemented yet");
}

export async function findByCI(ci: number): Promise<User> {
    throw new Error("Not implemented yet");
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

export async function updateUser(ci: number, user: User): Promise<"Success" | "Not found"> {
    throw new Error("Not implemented yet");
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
