import { Condition } from "./condition";

export interface Join {
    table: string,
    condition: Condition
}