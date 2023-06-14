import dbConn from "../configs/db.config"
import { unwrapResult } from "../helpers/resultHelpers";
import { DbNecessity, Necessity, necessityFromDb } from "../interfaces/necessity"

// TODO: create endpoint for all necessities
// TODO: add filters feature for endpoint for all necessities


export async function getNecessities(): Promise<Necessity[]> {
    const sqlRes = await dbConn.select({
        table: "necesidad",
    });

    const res: DbNecessity[] = unwrapResult(sqlRes);

    return res.map(necessityFromDb);
}

export async function getNecessityById(id: number): Promise<Necessity | undefined> {
    const sqlRes = await dbConn.select({
        table: "necesidad",
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });

    const res: DbNecessity | undefined = unwrapResult(sqlRes).at(0);

    return res && necessityFromDb(res);
}
