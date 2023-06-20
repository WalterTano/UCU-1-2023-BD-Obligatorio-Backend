import dbConn from "../configs/db.config";
import { Condition } from "../db/interfaces/condition";
import { SelectQuery } from "../db/interfaces/selectQuery";
import { isNotUndefined } from "../helpers/isNotUndefined";
import { chainResult, mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbPostulation, Postulation, postulationFromDb } from "../interfaces/postulation";
import { PostulationFilter } from "../interfaces/postulationFilter";
import { PostulationId } from "../interfaces/postulationId";
import { PostulationTemplate, postulationTemplateToDb } from "../interfaces/postulationTemplate";
import { Result } from "../types/result";

async function selectAllFromPostulations(query: Omit<SelectQuery, "table" | "columns">): Promise<DbPostulation[]> {
    const sqlRes = await dbConn.select({
        table: "postulacion",
        ...query
    });

    const res: DbPostulation[] = unwrapResult(sqlRes);
    return res;
}

function filterToConditions(filter: PostulationFilter): Condition[] {
    const necessityIdFilter: Condition | undefined = filter.necessityId
        ? { column: "id_necesidad", operation: "=", value: filter.necessityId }
        : undefined;

    const userIdFilter: Condition | undefined = filter.userId
        ? { column: "ci_postulante", operation: "=", value: filter.userId }
        : undefined;

    return [necessityIdFilter, userIdFilter].filter(isNotUndefined);
}

export async function getPostulations(filter: PostulationFilter): Promise<Postulation[]> {
    const sqlRes = await selectAllFromPostulations({
        conditions: filterToConditions(filter)
    });

    return sqlRes.map(postulationFromDb);
}

export async function getPostulation(id: PostulationId): Promise<Postulation | undefined> {
    const sqlRes = await selectAllFromPostulations({
        conditions: [
            { column: "id_necesidad", operation: "=", value: id.necessityId },
            { column: "ci_postulante", operation: "=", value: id.userId }
        ]
    });

    const res = sqlRes.at(0);
    return res && postulationFromDb(res);
}

export async function insertPostulation(template: PostulationTemplate): Promise<Result<void>> {
    const sqlRes = await dbConn.insert({
        table: "postulacion",
        idColumns: ["ci_postulante", "id_necesidad"],
        values: postulationTemplateToDb(template)
    });

    return mapResult(sqlRes, _ => void 0);
}

export async function updatePostulation(id: PostulationId, newStatus: string): Promise<Result<number>> {
    const res = await dbConn.update({
        table: "postulacion",
        values: {
            estado: newStatus
        },
        conditions: [
            { column: "id_necesidad", operation: "=", value: id.necessityId },
            { column: "ci_postulante", operation: "=", value: id.userId }
        ]
    });

    return chainResult(res,
        data => data == undefined
            ? { success: false, errorMessage: "At least one field must be included in the template" }
            : { success: true, data }
    );
}

export async function deletePostulation(id: PostulationId): Promise<Result<void>> {
    const res = await dbConn.delete({
        table: "postulacion",
        conditions: [
            { column: "id_necesidad", operation: "=", value: id.necessityId },
            { column: "ci_postulante", operation: "=", value: id.userId }
        ]
    });

    return chainResult(res,
        data => data > 0
            ? { success: true, data: void 0 }
            : { success: false, errorMessage: "Record not found" }
    );
}
