import { Condition } from "../condition";
import { GenericData } from "../generic-data";

// UPDATE <table> SET <data> WHERE <conditions>;
export interface UpdateQuery {
    table: string,
    values: GenericData,
    conditions?: Condition[]
}
