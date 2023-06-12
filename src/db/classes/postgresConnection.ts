import postgres, { Sql } from "postgres";
import { DatabaseConnection } from "../interfaces/databaseConnection";
import { Result } from "../../types/result";
import { conditionsToSql } from "../helpers/conditionsToSql";
import { orderColsToSql } from "../helpers/orderColsToSql";
import { limitToSql } from "../helpers/limitToSql";
import { resFromPromise } from "../helpers/resFromPromise";
import { SelectQuery } from "../interfaces/selectQuery";
import { InsertQuery } from "../interfaces/insertQuery";
import { UpdateQuery } from "../interfaces/updateQuery";
import { DeleteQuery } from "../interfaces/deleteQuery";
import { PostgresConfig } from "../interfaces/postgresInput";
import { tablesToSql } from "../helpers/tablesToSql";

export class PostgresConnection implements DatabaseConnection {
    private readonly sql: Sql;

    public constructor(config: PostgresConfig) {
        this.sql = postgres(config);
    }

    select(q: SelectQuery): Promise<Result<any[]>> {
        const sqlCols = q.columns ? this.sql(q.columns) : this.sql`*`;
        const sqlTable = tablesToSql(this.sql, q.tables);
        const sqlConditions = conditionsToSql(this.sql, q.conditions);
        const sqlOrder = orderColsToSql(this.sql, q.orderCols);
        const sqlLimit = limitToSql(this.sql, q.limit);

        return resFromPromise(
            this.sql`SELECT ${sqlCols} FROM ${sqlTable} ${sqlConditions} ${sqlOrder} ${sqlLimit}`
        );
    }

    insert(q: InsertQuery): Promise<Result<any>> {
        const sqlTable = this.sql(q.table);
        const sqlValues = this.sql(q.values);
        const sqlIdColumns = this.sql(q.idColumns);

        return resFromPromise(
            this.sql`INSERT INTO ${sqlTable} ${sqlValues} RETURNING ${sqlIdColumns}`
                .then(v => v[0])
        );
    }

    // TODO: Fix error
    // Throws an error if q.values is an empty object
    update(q: UpdateQuery): Promise<Result<number>> {
        const sqlTable = this.sql(q.table);
        const sqlValues = this.sql(q.values);
        const sqlConditions = conditionsToSql(this.sql, q.conditions);

        return resFromPromise(
            this.sql`UPDATE ${sqlTable} SET ${sqlValues} ${sqlConditions} RETURNING 1`
                .then(rows => rows.length)
        );
    }

    delete(q: DeleteQuery): Promise<Result<number>> {
        const sqlTable = this.sql(q.table);
        const sqlConditions = conditionsToSql(this.sql, q.conditions);

        return resFromPromise(
            this.sql`DELETE FROM ${sqlTable} ${sqlConditions} RETURNING 1`
                .then(rows => rows.length)
        );
    }

}
