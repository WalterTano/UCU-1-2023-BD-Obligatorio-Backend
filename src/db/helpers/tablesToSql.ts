import { PendingQuery, Sql } from "postgres";
import { Tables } from "../types/tables";
import { conditionToSql } from "./conditionToSql";
import { Join } from "../interfaces/join";

export function tablesToSql(sql: Sql, tables: Tables): PendingQuery<any> {
    const init: PendingQuery<any> = sql(tables[0]) as any;
    const joins = tables[1];

    if (!joins) {
        return sql``;
    }

    return joins.reduce((res: PendingQuery<any>, join: Join) => {
        const sqlTable = sql(join.table);
        const sqlCondition = conditionToSql(sql, join.condition);
        const result: any = sql`${res} INNER JOIN ${sqlTable} ON ${sqlCondition}`;
        return result;
    }, init);
}
