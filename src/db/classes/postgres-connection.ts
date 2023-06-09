import { Sql } from "postgres";
import sqlRawConnection from "../../configs/db.config";
import { DatabaseConnection } from "../interfaces/database-connection";
import { Result } from "../interfaces/result";
import { conditionsToSql } from "../helpers/conditions-to-sql";
import { orderColsToSql } from "../helpers/order-cols-to-sql";
import { limitToSql } from "../helpers/limit-to-sql";
import { resFromPromise } from "../helpers/res-from-promise";
import { SelectQuery } from "../interfaces/queries/select";
import { InsertQuery } from "../interfaces/queries/insert";
import { UpdateQuery } from "../interfaces/queries/update";
import { DeleteQuery } from "../interfaces/queries/delete";

export class PostgresConnection implements DatabaseConnection {
    public static readonly instance: DatabaseConnection = new PostgresConnection(sqlRawConnection);

    public constructor(private readonly sql: Sql) { }

    select(q: SelectQuery): Promise<Result<any[]>> {
        const sqlCols = q.columns ? this.sql(q.columns) : this.sql`*`;
        const sqlTable = this.sql(q.table);
        const sqlConditions = conditionsToSql(this.sql, q.conditions);
        const sqlOrder = orderColsToSql(this.sql, q.orderCols);
        const sqlLimit = limitToSql(this.sql, q.limit);

        return resFromPromise(
            this.sql`SELECT ${sqlCols} FROM ${sqlTable} ${sqlConditions} ${sqlOrder} ${sqlLimit}`
        );
    }

    insert(q: InsertQuery): Promise<Result<void>> {
        const sqlTable = this.sql(q.table);
        const sqlValues = this.sql(q.values);

        return resFromPromise(
            this.sql`INSERT INTO ${sqlTable} ${sqlValues}`
                .then(_ => { })
        );
    }

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
