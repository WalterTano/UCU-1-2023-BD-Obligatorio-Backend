import { PendingQuery, Sql } from "postgres";
import { Condition } from "../interfaces/condition";
import { conditionToSql } from "./conditionToSql";

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

