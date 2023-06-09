import { Condition, Result } from "./interfaces";
import { MaybeRow, PendingQuery, Sql } from "postgres";

export async function resFromPromise<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        const res = await promise;
        return { success: true, data: res };
    } catch (e) {
        const msg = e instanceof Error ? e.message : (e as any).toString();
        return { success: false, errorMsg: msg };
    }
}

const operationsMap: {
    [index in Condition["operation"]]: (sql: Sql) => PendingQuery<any>
} = {
    "<": sql => sql`<`,
    ">": sql => sql`>`,
    "=": sql => sql`=`,
    "<=": sql => sql`<=`,
    ">=": sql => sql`>=`,
    "IN": sql => sql`IN`,
    "LIKE": sql => sql`LIKE`
};

function conditionToSql(sql: Sql, c: Condition): PendingQuery<any> {
    const sqlColumn = sql(c.column);
    const sqlOperation = operationsMap[c.operation](sql);
    const value = c.value;

    return sql`${sqlColumn} ${sqlOperation} ${value}`;
}

export function conditionsToSql(sql: Sql, conditions?: Condition[]): PendingQuery<any> {
    if (conditions == undefined) {
        return sql``;
    }

    let res: PendingQuery<MaybeRow[]> | undefined;
    for (const c of conditions) {
        const sqlCondition = conditionToSql(sql, c);
        if (res != undefined) {
            res = sql`${res} AND ${sqlCondition}`;
        } else {
            res = sql`WHERE ${sqlCondition}`;
        }
    }

    return res || sql``;
}

export function orderColsToSql(sql: Sql, cols?: string[]): PendingQuery<any> {
    if (cols == undefined || cols.length == 0) {
        return sql``;
    }

    return sql`ORDER BY ${sql(cols)}`;
}

export function limitToSql(sql: Sql, limit?: number): PendingQuery<any> {
    if (limit == undefined) {
        return sql``;
    }

    return sql`LIMIT ${limit}`;
}
