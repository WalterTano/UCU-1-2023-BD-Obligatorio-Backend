export type Result<T> = { success: true, data: T } | { success: false, errorMsg: string };

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
