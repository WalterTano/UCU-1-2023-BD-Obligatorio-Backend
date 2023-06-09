import { Condition } from "./condition";
import { GenericData } from "./genericData";

// UPDATE <table> SET <data> WHERE <conditions>;
export interface UpdateQuery {
    table: string,
    values: GenericData,
    conditions?: Condition[]
}
