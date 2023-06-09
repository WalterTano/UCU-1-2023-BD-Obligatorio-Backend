import sql from "../configs/db.config";
import postgres, { MaybeRow, PendingQuery, Row, Sql } from 'postgres';

type Result<T> = { success: true, data: T } | { success: false, errorMsg: string };

export interface GenericData {
    [index: string]: any
}

export interface Condition {
    column: string,
    operation: "=" | "<" | ">" | "<=" | ">=" | "LIKE" | "IN"
    value: any
}

// SELECT <columns> FROM <table> WHERE <conditions> ORDER BY <orderCols> LIMIT <limit>;
export interface SelectQuery {
    columns?: string[],
    table: string,
    conditions?: Condition[],
    orderCols?: string[],
    limit?: number
}

// INSERT INTO <table> <data>;
export interface InsertQuery {
    table: string,
    values: GenericData
}

// UPDATE <table> SET <data> WHERE <conditions>;
export interface UpdateQuery {
    table: string,
    values: GenericData,
    conditions?: Condition[]
}

// DELETE FROM <table> WHERE <conditions>;
export interface DeleteQuery {
    table: string,
    conditions: Condition[]
}

export interface DatabaseConnection {
    select(q: SelectQuery): Promise<Result<any[]>>,
    insert(q: InsertQuery): Promise<Result<void>>,
    update(q: UpdateQuery): Promise<Result<number>>,
    delete(q: DeleteQuery): Promise<Result<number>>
}

// This should go in another file, but I don't know where
export class PostgresConnection implements DatabaseConnection {
    public constructor(private readonly sql: Sql) { }

    select(q: SelectQuery): Promise<Result<any[]>> {
        const sqlCols = q.columns ? sql(q.columns) : sql`*`;
        const sqlTable = sql(q.table);
        const sqlConditions = conditionsToSql(q.conditions);
        const sqlOrder = orderColsToSql(q.orderCols);
        const sqlLimit = limitToSql(q.limit);

        return resFromPromise(
            sql`SELECT ${sqlCols} FROM ${sqlTable} ${sqlConditions} ${sqlOrder} ${sqlLimit}`
        );
    }

    insert(q: InsertQuery): Promise<Result<void>> {
        const sqlTable = sql(q.table);
        const sqlValues = sql(q.values);

        return resFromPromise(
            sql`INSERT INTO ${sqlTable} ${sqlValues}`
                .then(_ => { })
        );
    }

    update(q: UpdateQuery): Promise<Result<number>> {
        const sqlTable = sql(q.table);
        const sqlValues = sql(q.values);
        const sqlConditions = conditionsToSql(q.conditions);

        return resFromPromise(
            sql`UPDATE ${sqlTable} SET ${sqlValues} ${sqlConditions} RETURNING 1`
                .then(rows => rows.length)
        );
    }

    delete(q: DeleteQuery): Promise<Result<number>> {
        const sqlTable = sql(q.table);
        const sqlConditions = conditionsToSql(q.conditions);

        return resFromPromise(
            sql`DELETE FROM ${sqlTable} ${sqlConditions} RETURNING 1`
                .then(rows => rows.length)
        );
    }

}

async function resFromPromise<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        const res = await promise;
        return { success: true, data: res };
    } catch (e) {
        const msg = e instanceof Error ? e.message : (e as any).toString();
        return { success: false, errorMsg: msg };
    }
}

const operationsMap: {
    [index in Condition["operation"]]: PendingQuery<any>
} = {
    "<": sql`<`,
    ">": sql`>`,
    "=": sql`=`,
    "<=": sql`<=`,
    ">=": sql`>=`,
    "IN": sql`IN`,
    "LIKE": sql`LIKE`
};

function conditionToSql(c: Condition): PendingQuery<any> {
    return sql`${sql(c.column)} ${operationsMap[c.operation]} ${c.value}`;
}

export function conditionsToSql(conditions?: Condition[]): PendingQuery<any> {
    if (conditions == undefined) {
        return sql``;
    }

    let res: PendingQuery<MaybeRow[]> | undefined;
    for (const c of conditions) {
        const sqlCondition = conditionToSql(c);
        if (res != undefined) {
            res = sql`${res} AND ${sqlCondition}`;
        } else {
            res = sql`WHERE ${sqlCondition}`;
        }
    }

    return res || sql``;
}

function orderColsToSql(cols?: string[]): PendingQuery<any> {
    if (cols == undefined || cols.length == 0) {
        return sql``;
    }

    return sql`ORDER BY ${sql(cols)}`;
}

function limitToSql(limit?: number): PendingQuery<any> {
    if (limit == undefined) {
        return sql``;
    }

    return sql`LIMIT ${limit}`;
}
