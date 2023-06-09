import { GenericData } from "./genericData";

// INSERT INTO <table> <data>;
export interface InsertQuery {
    table: string,
    values: GenericData
}

