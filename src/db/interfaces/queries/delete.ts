import { Condition } from "../condition";

// DELETE FROM <table> WHERE <conditions>;
export interface DeleteQuery {
    table: string,
    conditions: Condition[]
}

