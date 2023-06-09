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
        const sqlConds = conditionsToSql(q.conditions);
        const sqlOrder = orderColsToSql(q.orderCols);
        const sqlLimit = limitToSql(q.limit);
        
        return resFromPromise(
            sql`SELECT ${sqlCols} FROM ${sqlTable} ${sqlConds} ${sqlOrder} ${sqlLimit}`
        );
    }

    insert(q: InsertQuery): Promise<Result<void>> {
        throw new Error("Method not implemented.");
    }
    update(q: UpdateQuery): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }
    delete(q: DeleteQuery): Promise<Result<number>> {
        throw new Error("Method not implemented.");
    }

}

async function resFromPromise<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        const res = await promise;
        return { success: true, data: res };
    } catch(e) {
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

function conditionsToSql(conditions?: Condition[]): PendingQuery<any> {
    if (conditions == undefined) {
        return sql``;
    }

    let res: PendingQuery<MaybeRow[]> | undefined;
    for (const c of conditions) {
        const sqlCondition = conditionToSql(c);
        if (res != undefined) {
            res = sql`${res} and ${sqlCondition}`;
        } else {
            res = sql`where ${sqlCondition}`;
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
