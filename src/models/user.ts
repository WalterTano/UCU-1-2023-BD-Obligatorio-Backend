import { DbUser, User, userFromDb, userToDb } from '../interfaces/user';
import dbConn from "../configs/db.config";
import { UserTemplate, userTemplateToDb } from '../interfaces/userTemplate';
import { Result } from '../types/result';
import { chainResult, mapResult, unwrapResult } from '../helpers/resultHelpers';
import { SelectQuery } from '../db/interfaces/selectQuery';
import { UserFilter } from '../interfaces/userFilter';
import { Condition } from '../db/interfaces/condition';
import { isNotUndefined } from '../helpers/isNotUndefined';
import { fullUpdateTelNumbers, getTelNumbers, postTelNumbers } from './telNumber';

const columns = [
    "ci", "nombre", "apellido", "email", "geo_distancia",
    "geo_activado", "es_admin", "latitud", "longitud"
];

async function selectAllFromUsers(query: Omit<SelectQuery, "table" | "columns">): Promise<DbUser[]> {
    const sqlRes = await dbConn.select({
        columns: columns,
        table: "usuario",
        ...query
    });

    const res: DbUser[] = unwrapResult(sqlRes);
    return res;
}

function filterToConditions(filter: UserFilter): Condition[] {
    const idsCondition: Condition | undefined =
        filter.ids
            ? { column: "ci", operation: "IN", value: filter.ids }
            : undefined;

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

    return [idsCondition, firstNameCondition, lastNameCondition, skillCondition].filter(isNotUndefined);
}

export async function getUsers(filter: UserFilter): Promise<User[]> {
    const sqlRes = await dbConn.select({
        table: "usuario_habilidad",
        columns: columns,
        conditions: filterToConditions(filter)
    });

    const midRes: DbUser[] = unwrapResult(sqlRes);
    console.log("1:", midRes);

    const usersAndNumbers = await Promise.all(
        midRes.map(
            user => getTelNumbers(user.ci)
                .then(numbers => ({ user, numbers }))
        )
    );

    const res = usersAndNumbers.map(({user, numbers}) => userFromDb(user, numbers));
    return res;
}

export async function findByCredentials(ci: string, hashpwd: string): Promise<User | undefined> {
    const sqlRes = await selectAllFromUsers({
        conditions: [
            { column: "ci", operation: "=", value: ci },
            { column: "hashpwd", operation: "=", value: hashpwd }
        ]
    });

    const res = sqlRes.at(0);
    const numbers = await getTelNumbers(parseInt(ci));
    return res && userFromDb(res, numbers);
}

export async function findByCI(ci: string): Promise<User | undefined> {
    const sqlRes = await selectAllFromUsers({
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    const res: DbUser | undefined = sqlRes.at(0);
    const numbers = await getTelNumbers(parseInt(ci));
    return res && userFromDb(res, numbers);
}

export async function newUser(user: UserTemplate): Promise<Result<number>> {
    const { info, numbers } = await userTemplateToDb(user);

    const res1 = await dbConn.insert({
        table: "usuario",
        idColumns: ["ci"],
        values: info
    });
    if (!res1.success) {
        return res1;
    }
    const ci: number = res1.data.ci;

    if (numbers == undefined) {
        return res1;
    }

    const res2 = await postTelNumbers(ci, numbers);
    return mapResult(res2, () => ci);
}

export async function updateUser(ci: number, user: Omit<User, "id">): Promise<Result<number>> {
    const { info, numbers } = userToDb({ ...user, id: 0 });

    const dbInput: Partial<DbUser> = { ...info };
    delete dbInput.ci;

    const res1 = await dbConn.update({
        table: "usuario",
        values: dbInput,
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    if (!res1.success) {
        return res1;
    } else if (res1.data == undefined) {
        return {
            success: false,
            errorMessage: "At least one field must be included in the template"
        };
    }

    if (numbers == undefined) {
        return res1 as Result<number>;
    }

    const res2 = await fullUpdateTelNumbers(ci, numbers);
    if (!res2.success) {
        return res2;
    }

    return res1 as Result<number>;
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
