import { GenericData } from "./genericData";

// INSERT INTO <table> <data>;
export interface InsertQuery {
    table: string,
    idColumns: string[],
    values: GenericData
}

