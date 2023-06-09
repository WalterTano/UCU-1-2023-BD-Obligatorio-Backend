import sql from "../configs/db.config";
import postgres from 'postgres';

type Result<T> = { success: true, data: T } | { success: false, errorMsg: string };

export interface GenericData {
    [index: string]: any
}

type SqlResult = postgres.PendingQuery<postgres.Row[]>;

/*
Represents a reference to a tuple in a table, via the table name and its primary keys.
It's to facilitate the construction of queries like
    `SELECT * from ${table} WHERE ${key1} = ${id1} AND ${key2} = ${id2} AND ...`
*/
export class TupleRef {
    public constructor(
        public name: string,
        public ids: [string, any][]
    ) { }

    // Returns a representative to the filter of all ids in this table
    public idsToFilter(): SqlResult {
        let res: postgres.PendingQuery<postgres.Row[]> | undefined;
        for (const [key, val] of this.ids) {
            res = res
                ? sql`${res} and ${sql(key)} = ${val} `
                : sql`where ${sql(key)} = ${val} `;
        }

        if (res == undefined) {
            throw new Error("TupleRef must have at least one id");
        }

        return res;
    }
}

/*
Example: await selectAll("alumnos");
*/
export function selectAll(table: string): Promise<postgres.Row[]> {
    return sql`SELECT * FROM ${sql(table)}`;
}

/*
Example: await selectById(
    new TupleRef("alumnos", [["idalu", 5000]])
);
*/
export async function selectById(table: TupleRef): Promise<postgres.Row> {
    const filter = table.idsToFilter();
    const midRes = await sql`SELECT * FROM ${sql(table.name)} ${filter}`;
    return midRes[0];
}

/*
Example: await insert("alumnos", {
    idalu: 10001,
    nomalu: "n11000",
    apealu: "a11000",
    docid: "d11000"
});
*/
export async function insert(table: string, values: GenericData): Promise<Result<void>> {
    try {
        await sql`INSERT INTO ${sql(table)} ${sql(values)}`;
        return { success: true, data: void 0 };
    } catch(e) {
        const msg = e instanceof Error ? e.message : (e as any).toString();
        return { success: false, errorMsg: msg };
    }
}

/*
Example: await update(
    new TupleRef("alumnos", [["idalu", 10001]]),
    { apealu: "aa11000" }
)
*/
export async function update(table: TupleRef, values: GenericData): Promise<Result<number>> {
    const filter = table.idsToFilter();
    try {
        const res = await sql`UPDATE ${sql(table.name)} SET ${sql(values)} ${filter} returning 1`;
        return { success: true, data: res.length };
    } catch(e) {
        const msg = e instanceof Error ? e.message : (e as any).toString();
        return { success: false, errorMsg: msg };
    }
}

/*
Example: await remove(
    new TupleRef("alumnos", [["idalu", 10001]])
)
*/
export async function remove(table: TupleRef): Promise<Result<number>> {
    const filter = table.idsToFilter();
    try {
        const res = await sql`DELETE FROM ${sql(table.name)} ${filter} returning 1`;
        return { success: true, data: res.length };
    } catch(e) {
        const msg = e instanceof Error ? e.message : (e as any).toString();
        return { success: false, errorMsg: msg };
    }
}
