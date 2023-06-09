import { PendingQuery, Sql } from "postgres";

export function orderColsToSql(sql: Sql, cols?: string[]): PendingQuery<any> {
    if (cols == undefined || cols.length == 0) {
        return sql``;
    }

    return sql`ORDER BY ${sql(cols)}`;
}

