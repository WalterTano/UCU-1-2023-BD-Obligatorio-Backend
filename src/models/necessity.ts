import dbConn from "../configs/db.config";
import { DbNecessity, Necessity, necessityFromDb } from "../interfaces/necessity"
import { SelectQuery } from "../db/interfaces/selectQuery";
import { mapResult, unwrapResult } from "../helpers/resultHelpers";
import { NecessityTemplate, necessityTemplateToDb } from "../interfaces/necessityTemplate";
import { Result } from "../types/result";

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

export async function insertNecessity(template: NecessityTemplate): Promise<Result<number>> {
    const dbTemp = necessityTemplateToDb(template);

    const sqlRes = await dbConn.insert({
        table: "necesidad",
        idColumns: ["id"],
        values: dbTemp
    });

    return mapResult(sqlRes, data0 => {
        const data: { id: number } = data0;
        return data.id;
    });
}

export async function updateNecessity(id: number, template: NecessityTemplate): Promise<Result<number | undefined>> {
    const dbTemp = necessityTemplateToDb(template);

    return await dbConn.update({
        table: "necesidad",
        values: dbTemp,
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });
}
