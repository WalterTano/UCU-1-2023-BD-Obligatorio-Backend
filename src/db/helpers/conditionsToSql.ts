import { PendingQuery, Sql } from "postgres";
import { Condition } from "../interfaces/condition";

const operationsMap: {
    [index in Condition["operation"]]: (sql: Sql, value: any) => PendingQuery<any>
} = {
    "<": (sql, v) => sql`< ${v}`,
    ">": (sql, v) => sql`> ${v}`,
    "=": (sql, v) => sql`= ${v}`,
    "<=": (sql, v) => sql`<= ${v}`,
    ">=": (sql, v) => sql`>= ${v}`,
    "IN": (sql, v) => sql`IN ${sql(v)}`,
    "LIKE": (sql, v) => sql`LIKE ${v}`
};

function conditionToSql(sql: Sql, c: Condition): PendingQuery<any> {
    const sqlColumn = sql(c.column);
    const sqlRemainder = operationsMap[c.operation](sql, c.value);

    return sql`${sqlColumn} ${sqlRemainder}`;
}

export function conditionsToSql(sql: Sql, conditions?: Condition[]): PendingQuery<any> {
    if (conditions == undefined) {
        return sql``;
    }

    let res: PendingQuery<any> | undefined;
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

