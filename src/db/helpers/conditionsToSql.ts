import { PendingQuery, Sql } from "postgres";
import { Condition } from "../interfaces/condition";

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

