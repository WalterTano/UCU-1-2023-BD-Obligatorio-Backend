import { PendingQuery, Sql } from "postgres";

export function limitToSql(sql: Sql, limit?: number): PendingQuery<any> {
    if (limit == undefined) {
        return sql``;
    }

    return sql`LIMIT ${limit}`;
}
