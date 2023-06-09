import { Condition } from "./condition";

// SELECT <columns> FROM <table> WHERE <conditions> ORDER BY <orderCols> LIMIT <limit>;
export interface SelectQuery {
    columns?: string[],
    table: string,
    conditions?: Condition[],
    orderCols?: string[],
    limit?: number
}

