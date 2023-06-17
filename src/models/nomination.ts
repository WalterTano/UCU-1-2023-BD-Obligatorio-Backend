import dbConn from "../configs/db.config";
import { Condition } from "../db/interfaces/condition";
import { SelectQuery } from "../db/interfaces/selectQuery";
import { isNotUndefined } from "../helpers/isNotUndefined";
import { chainResult, mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbNomination, Nomination, nominationFromDb } from "../interfaces/nomination";
import { NominationFilter } from "../interfaces/nominationFilter";
import { NominationId } from "../interfaces/nominationId";
import { NominationTemplate, nominationTemplateToDb } from "../interfaces/nominationTemplate";
import { Result } from "../types/result";

async function selectAllFromNominations(query: Omit<SelectQuery, "table" | "columns">): Promise<DbNomination[]> {
    const sqlRes = await dbConn.select({
        table: "postulacion",
        ...query
    });

    const res: DbNomination[] = unwrapResult(sqlRes);
    return res;
}

function filterToConditions(filter: NominationFilter): Condition[] {
    const necessityIdFilter: Condition | undefined = filter.necessityId
        ? { column: "id_necesidad", operation: "=", value: filter.necessityId }
        : undefined;

    const userIdFilter: Condition | undefined = filter.userId
        ? { column: "ci_postulante", operation: "=", value: filter.userId }
        : undefined;

    return [necessityIdFilter, userIdFilter].filter(isNotUndefined);
}

export async function getNominations(filter: NominationFilter): Promise<Nomination[]> {
    const sqlRes = await selectAllFromNominations({
        conditions: filterToConditions(filter)
    });

    return sqlRes.map(nominationFromDb);
}

export async function insertNomination(template: NominationTemplate): Promise<Result<void>> {
    const sqlRes = await dbConn.insert({
        table: "postulacion",
        idColumns: ["ci_postulante", "id_necesidad"],
        values: nominationTemplateToDb(template)
    });

    return mapResult(sqlRes, _ => void 0);
}

export async function updateNomination(id: NominationId, newStatus: string): Promise<Result<number>> {
    const res = await dbConn.update({
        table: "postulacion",
        values: {
            status: newStatus
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

export async function deleteNomination(id: NominationId): Promise<Result<void>> {
    const res = await dbConn.delete({
        table: "postulacion",
        conditions: [
            { column: "id_necesidad", operation: "=", value: id.necessityId },
            { column: "ci_postulante", operation: "=", value: id.userId }
        ]
    });

    return chainResult(res,
        data => data > 0
            ? { success: false, errorMessage: "Record not found" }
            : { success: true, data: void 0 }
    );
}
