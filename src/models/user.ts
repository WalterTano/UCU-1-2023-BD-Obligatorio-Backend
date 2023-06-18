import { DbUser, User, userFromDb, userToDb } from '../interfaces/user';
import dbConn from "../configs/db.config";
import { UserTemplate, userTemplateToDb } from '../interfaces/userTemplate';
import { Result } from '../types/result';
import { chainResult, mapResult, unwrapResult } from '../helpers/resultHelpers';
import { SelectQuery } from '../db/interfaces/selectQuery';
import { UserFilter } from '../interfaces/userFilter';
import { Condition } from '../db/interfaces/condition';
import { isNotUndefined } from '../helpers/isNotUndefined';

const columns = [
    "ci", "nombre", "apellido", "email", "geo_distancia",
    "geo_activado", "es_admin", "latitud", "longitud"
];

export async function selectAllFromUsers(query: Omit<SelectQuery, "table" | "columns">): Promise<DbUser[]> {
    const sqlRes = await dbConn.select({
        columns: columns,
        table: "usuario",
        ...query
    });

    const res: DbUser[] = unwrapResult(sqlRes);
    return res;
}

function filterToConditions(filter: UserFilter): Condition[] {
    const firstNameCondition: Condition | undefined =
        filter.firstName !== undefined
            ? { column: "nombre", operation: "LIKE", value: `%${filter.firstName}%` }
            : undefined;
    
    const lastNameCondition: Condition | undefined =
        filter.lastName !== undefined
            ? { column: "apellido", operation: "LIKE", value: `%${filter.lastName}%` }
            : undefined;
    
    const skillCondition: Condition | undefined =
        filter.skills
            ? { column: "nombre_habilidad", operation: "IN", value: filter.skills }
            : undefined;

    return [firstNameCondition, lastNameCondition, skillCondition].filter(isNotUndefined);
}

export async function getUsers(filter: UserFilter): Promise<User[]> {
    const sqlRes = await dbConn.select({
        table: "usuario_habilidad",
        columns: columns,
        conditions: filterToConditions(filter)
    });

    const res: DbUser[] = unwrapResult(sqlRes);
    return res.map(userFromDb);
}

export async function findByCredentials(ci: string, hashpwd: string): Promise<User | undefined> {
    const sqlRes = await selectAllFromUsers({
        conditions: [
            { column: "ci", operation: "=", value: ci },
            { column: "hashpwd", operation: "=", value: hashpwd }
        ]
    });

    const res = sqlRes.at(0);
    return res && userFromDb(res);
}

export async function findByCI(ci: string): Promise<User | undefined> {
    const sqlRes = await selectAllFromUsers({
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    const res: DbUser | undefined = sqlRes.at(0);
    return res && userFromDb(res);
}

export async function newUser(user: UserTemplate): Promise<Result<number>> {
    const dbUser = await userTemplateToDb(user);

    const result = await dbConn.insert({
        table: "usuario",
        idColumns: ["ci"],
        values: dbUser
    });

    return mapResult(result, data => data.ci);
}

// It's not the same that an object has no attribute,
// or that it has that attribute with the value 'undefined'
export async function updateUser(ci: number, user: Omit<User, "id">): Promise<Result<number>> {
    const dbUser = userToDb({ ...user, id: 0 });

    const dbInput: Partial<DbUser> = { ...dbUser };
    delete dbInput.ci;

    const res = await dbConn.update({
        table: "usuario",
        values: dbUser,
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    return chainResult(res,
        data => data == undefined
            ? { success: false, errorMessage: "At least one field must be included in the template" }
            : { success: true, data }
    );
}

export async function deleteUser(ci: number): Promise<Result<void>> {
    const res = await dbConn.delete({
        table: "usuario",
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    return chainResult(res,
        data => data > 0
            ? { success: true, data: void 0 }
            : { success: false, errorMessage: "Record not found" }
    );
}
