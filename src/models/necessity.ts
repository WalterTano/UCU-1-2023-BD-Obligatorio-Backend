import dbConn from "../configs/db.config"
import { SelectQuery } from "../db/interfaces/selectQuery";
import { mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbNecessity, Necessity, necessityFromDb } from "../interfaces/necessity"
import { DbNecessityId, NecessityId, necessityIdFromDb } from "../interfaces/necessityId";
import { NecessityTemplate, necessityTemplateToDb } from "../interfaces/necessityTemplate";
import { Result } from "../types/result";

// TODO: create endpoint for all necesities
// TODO: create endpoint for all necesities with filters

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

export async function insertNecessity(template: NecessityTemplate, userId: number): Promise<Result<NecessityId>> {
    const dbTemp = necessityTemplateToDb(template, userId);

    const sqlRes = await dbConn.insert({
        table: "necesidad",
        idColumns: ["id", "ci_creador"],
        values: dbTemp
    });

    return mapResult(sqlRes, data0 => {
        const data: DbNecessityId = data0;
        return necessityIdFromDb(data);
    });
}
