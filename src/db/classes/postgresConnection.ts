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
import { mapErrResult } from "../../helpers/resultHelpers";
import { filterError } from "../helpers/filterError";

export class PostgresConnection implements DatabaseConnection {
    private readonly sql: Sql;

    public constructor(config: PostgresConfig) {
        this.sql = postgres(config);
    }

    async select(q: SelectQuery): Promise<Result<any[]>> {
        const sqlCols = q.columns ? this.sql(q.columns) : this.sql`*`;
        const sqlTable = this.sql(q.table);
        const sqlConditions = conditionsToSql(this.sql, q.conditions);
        const sqlOrder = orderColsToSql(this.sql, q.orderCols);
        const sqlLimit = limitToSql(this.sql, q.limit);

        const res = await resFromPromise(
            this.sql`SELECT DISTINCT ${sqlCols} FROM ${sqlTable} ${sqlConditions} ${sqlOrder} ${sqlLimit}`
        );
        return filterError(res, "Error while reading information");
    }

    async insert(q: InsertQuery): Promise<Result<any>> {
        const sqlTable = this.sql(q.table);
        const sqlValues = this.sql(q.values);
        const sqlIdColumns = this.sql(q.idColumns);

        const res = await resFromPromise(
            this.sql`INSERT INTO ${sqlTable} ${sqlValues} RETURNING ${sqlIdColumns}`
                .then(v => v[0])
        );
        return filterError(res, "Error while inserting information");;
    }

    async update(q: UpdateQuery): Promise<Result<number | undefined>> {
        const values = q.values;
        for (let key in values) {
            if (values[key] === undefined) {
                delete values[key];
            }
        }

        if (Object.keys(values).length == 0) {
            return { success: true, data: undefined };
        }

        const sqlTable = this.sql(q.table);
        const sqlValues = this.sql(values);
        const sqlConditions = conditionsToSql(this.sql, q.conditions);

        const res = await resFromPromise(
            this.sql`UPDATE ${sqlTable} SET ${sqlValues} ${sqlConditions} RETURNING 1`
                .then(rows => rows.length)
        );
        return filterError(res, "Error while updating information");;
    }

    async delete(q: DeleteQuery): Promise<Result<number>> {
        const sqlTable = this.sql(q.table);
        const sqlConditions = conditionsToSql(this.sql, q.conditions);

        const res = await resFromPromise(
            this.sql`DELETE FROM ${sqlTable} ${sqlConditions} RETURNING 1`
                .then(rows => rows.length)
        );
        return filterError(res, "Error while deleting information");;
    }

}
