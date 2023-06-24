import dbConn from "../configs/db.config"
import { SelectQuery } from "../db/interfaces/selectQuery";
import { isNotUndefined } from "../helpers/isNotUndefined";
import { mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbRequirement, Requirement, requirementFromDb, requirementToDb } from "../interfaces/requirement";
import { Result } from "../types/result";

async function selectPartialFromRequirements(query: Omit<SelectQuery, "table">): Promise<Partial<DbRequirement>[]> {
    const sqlRes = await dbConn.select({
        table: "necesidad_req_habilidad",
        ...query
    });

    const res: Partial<DbRequirement>[] = unwrapResult(sqlRes);
    return res;
}

export async function getRequirements(necessityId: number): Promise<string[]> {
    const res = await selectPartialFromRequirements({
        columns: [ "nombre_habilidad" ],
        conditions: [
            { column: "id_necesidad", operation: "=", value: necessityId }
        ]
    });

    return res.map(v => v.nombre_habilidad).filter(isNotUndefined);
}

export async function postRequirements(template: Requirement[]): Promise<Result<void>> {
    const sqlRes = await dbConn.insert({
        idColumns: ["id_necesidad", "nombre_habilidad"],
        table: "necesidad_req_habilidad",
        values: template.map(reqTemplate => requirementToDb(reqTemplate))
    });

    return mapResult(sqlRes, () => void 0);
}

export async function deleteRequirement(necessityId: number, skillName: string): Promise<Result<void>> {
    const sqlRes = await dbConn.delete({
        table: "necesidad_req_habilidad",
        conditions: [
            { column: "id_necesidad", operation: "=", value: necessityId },
            { column: "nombre_habilidad", operation: "=", value: skillName }
        ]
    });

    return mapResult(sqlRes, () => void 0);
}

export async function deleteRequirements(necessityId: number, skillNames: string[]): Promise<Result<void>> {
    const sqlRes = await dbConn.delete({
        table: "necesidad_req_habilidad",
        conditions: [
            { column: "id_necesidad", operation: "=", value: necessityId },
            { column: "nombre_habilidad", operation: "IN", value: skillNames }
        ]
    });

    return mapResult(sqlRes, () => void 0);
}