import { PendingQuery, Sql } from "postgres";
import { Condition, SimpleCondition } from "../interfaces/condition";

const operationsMap: {
    [index in SimpleCondition["operation"]]: (sql: Sql, value: any) => PendingQuery<any>
} = {
    "<": (sql, v) => sql`< ${v}`,
    ">": (sql, v) => sql`> ${v}`,
    "=": (sql, v) => sql`= ${v}`,
    "<=": (sql, v) => sql`<= ${v}`,
    ">=": (sql, v) => sql`>= ${v}`,
    "IN": (sql, v) => sql`IN ${sql(v)}`,
    "LIKE": (sql, v) => sql`LIKE ${v}`
};

function simpleConditionToSql(sql: Sql, c: SimpleCondition): PendingQuery<any> {
    const sqlColumn = sql(c.column);
    const sqlRemainder = operationsMap[c.operation](sql, c.value);

    return sql`${sqlColumn} ${sqlRemainder}`;
}

function conditionToSql(sql: Sql, c: Condition): PendingQuery<any> {
    if (c.type === "disjunction") {
        let res: PendingQuery<any> = conditionToSql(sql, c.values[0]);
        for (const miniCondition of c.values.slice(1)) {
            const sqlCondition = conditionToSql(sql, miniCondition);
            res = sql`${res} OR ${sqlCondition}`;
        }
        return sql`(${res})`;
    } else {
        return simpleConditionToSql(sql, c);
    }
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

