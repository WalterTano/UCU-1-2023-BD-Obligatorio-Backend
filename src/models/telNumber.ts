import dbConn from "../configs/db.config";
import { chainResult, mapResult, unwrapResult } from "../helpers/resultHelpers";
import { Result } from "../types/result";

export async function getTelNumbers(userId: number): Promise<number[]> {
    const sqlRes = await dbConn.select({
        columns: ["telefono"],
        table: "usuario_telefono",
        conditions: [
            { column: "ci_usuario", operation: "=", value: userId }
        ]
    });

    const res: { telefono: number }[] = unwrapResult(sqlRes);
    return res.map(r => r.telefono);
}

async function postTelNumber(userId: number, telephone: number): Promise<Result<void>> {
    const sqlRes = await dbConn.insert({
        idColumns: ["telefono", "ci_usuario"],
        table: "usuario_telefono",
        values: {
            telefono: telephone,
            ci_usuario: userId
        }
    });

    return mapResult(sqlRes, () => void 0);
}

export async function postTelNumbers(userId: number, telephones: number[]): Promise<Result<void>> {
    const results = await Promise.all(
        telephones.map(tel => postTelNumber(userId, tel))
    );
    
    return results.reduce(
        (acc, res) => chainResult(acc, () => res),
        { success: true, data: void 0 }
    );
}

export async function deleteAllTelNumbers(userId: number): Promise<Result<void>> {
    const sqlRes = await dbConn.delete({
        table: "usuario_telefono",
        conditions: [
            { column: "ci_usuario", operation: "=", value: userId }
        ]
    });

    return mapResult(sqlRes, () => void 0);
};

export async function fullUpdateTelNumbers(userId: number, newNumbers: number[]): Promise<Result<void>> {
    const res1 = await deleteAllTelNumbers(userId);
    if (!res1.success) {
        return res1;
    }

    return await postTelNumbers(userId, newNumbers);
}
