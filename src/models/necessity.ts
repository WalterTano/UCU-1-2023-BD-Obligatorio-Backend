import dbConn from "../configs/db.config";
import { DbNecessity, Necessity, necessityFromDb } from "../interfaces/necessity"
import { SelectQuery } from "../db/interfaces/selectQuery";
import { chainResult, mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbNecessityTemplate, NecessityTemplate, necessityTemplateToDb } from "../interfaces/necessityTemplate";
import { Result } from "../types/result";
import { NecessityFilter } from "../interfaces/necessityFilter";

async function selectAllFromNecessities(query: Omit<SelectQuery, "table" | "columns">): Promise<DbNecessity[]> {
    const sqlRes = await dbConn.select({
        table: "necesidad",
        ...query
    });

    const res: DbNecessity[] = unwrapResult(sqlRes);
    return res;
}

// TODO: add filters feature for endpoint for all necessities
export async function getNecessities(filter: NecessityFilter): Promise<Necessity[]> {
    const res = await selectAllFromNecessities({});
    return res.map(necessityFromDb);
}

export async function getNecessityById(id: number): Promise<Necessity | undefined> {
    const sqlRes = await selectAllFromNecessities({
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });

    const res: DbNecessity | undefined = sqlRes.at(0);
    return res && necessityFromDb(res);
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

export async function updateNecessity(id: number, template: Omit<NecessityTemplate, "userId">): Promise<Result<number>> {
    const dbTemp = necessityTemplateToDb({ ...template, userId: 0 });

    const dbInput: Partial<DbNecessityTemplate> = { ...dbTemp };
    delete dbInput.ci_creador;

    const res = await dbConn.update({
        table: "necesidad",
        values: dbInput,
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });

    return chainResult(res,
        data => data == undefined
            ? { success: false, errorMessage: "At least one field must be included in the template" }
            : { success: true, data }
    );
}

export async function deleteNecessity(id: number): Promise<Result<void>> {
    const res = await dbConn.delete({
        table: "necesidad",
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });

    return chainResult(res,
        data => data > 0
            ? { success: false, errorMessage: "Record not found" }
            : { success: true, data: void 0 }
    );
}
