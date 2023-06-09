// INSERT INTO <table> <data>;
export interface InsertQuery {
    table: string,
    values: GenericData
}

