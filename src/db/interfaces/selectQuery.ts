import { Tables } from "../types/tables";
import { Condition } from "./condition";

// SELECT <columns> FROM <table> WHERE <conditions> ORDER BY <orderCols> LIMIT <limit>;
export interface SelectQuery {
    columns?: string[],
    tables: Tables,
    conditions?: Condition[],
    orderCols?: string[],
    limit?: number
}

