import dbConn from "../configs/db.config"
import { SelectQuery } from "../db/interfaces/selectQuery";
import { unwrapResult } from "../helpers/resultHelpers";
import { DbNecessity, Necessity, necessityFromDb } from "../interfaces/necessity"

// TODO: do the same for other models
async function selectAllFromNecessities(query: Omit<SelectQuery, "table" | "columns">): Promise<DbNecessity[]> {
    const sqlRes = await dbConn.select({
        columns: [
            "id", "ci_creador", "descripcion", "estado", "lat_ubicacion",
            "long_ubicacion", "fecha_inicio", "fecha_fin", "fecha_solucionada", "titulo"
        ],
        table: "necesidad",
        ...query
    });

    const res: DbNecessity[] = unwrapResult(sqlRes);
    return res;
}

export async function getNecessitiesByUser(userId: number): Promise<Necessity[]> {
    const raw = await selectAllFromNecessities({
        conditions: [
            { column: "ci_creador", operation: "=", value: userId }
        ]
    });

    return raw.map(necessityFromDb);
}

export async function getNecessityById(userId: number, necId: number): Promise<Necessity | undefined> {
    const raw = await selectAllFromNecessities({
        conditions: [
            { column: "ci_creador", operation: "=", value: userId },
            { column: "id", operation: "=", value: necId }
        ]
    });

    const rawSingle = raw.at(0);
    return rawSingle && necessityFromDb(rawSingle);
}
