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

export function conditionToSql(sql: Sql, c: Condition): PendingQuery<any> {
    const sqlColumn = sql(c.column);
    const sqlOperation = operationsMap[c.operation](sql);
    const value = c.value;

    return sql`${sqlColumn} ${sqlOperation} ${value}`;
}

