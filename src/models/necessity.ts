import dbConn from "../configs/db.config";
import { DbNecessity, Necessity, necessityFromDb } from "../interfaces/necessity"
import { SelectQuery } from "../db/interfaces/selectQuery";
import { mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbNecessityTemplate, NecessityTemplate, necessityTemplateToDb } from "../interfaces/necessityTemplate";
import { Result } from "../types/result";
import { Condition } from "../db/interfaces/condition";

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

// TODO: do the same for other models
async function selectAllFromNecessities(query: Omit<SelectQuery, "table" | "columns">): Promise<DbNecessity[]> {
    const sqlRes = await dbConn.select({
        columns: [
            "id", "ci_creador", "titulo", "descripcion", "estado", "fecha_creacion",
            "latitud", "longitud", "fecha_inicio", "fecha_fin", "fecha_solucionada"
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

export async function updateNecessity(id: number, template: Omit<NecessityTemplate, "userId">): Promise<Result<number | undefined>> {
    const dbTemp = necessityTemplateToDb({ ...template, userId: 0 });

    const dbInput: Partial<DbNecessityTemplate> = { ...dbTemp };
    delete dbInput.ci_creador;

    console.log("1:", dbInput);
    return await dbConn.update({
        table: "necesidad",
        values: dbInput,
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });
}

export async function deleteNecessity(id: number): Promise<Result<boolean>> {
    const res = await dbConn.delete({
        table: "necesidad",
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });

    return mapResult(res, data => data > 0);
}
