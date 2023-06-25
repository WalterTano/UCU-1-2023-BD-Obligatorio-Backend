import dbConn from "../configs/db.config";
import { isNotUndefined } from "../helpers/isNotUndefined";
import { unwrapResult } from "../helpers/resultHelpers";

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

async function postTelNumber(userId: number, telephone: number): Promise<number | null> {
    const sqlRes = await dbConn.insert({
        idColumns: ["telefono", "ci_usuario"],
        table: "usuario_telefono",
        values: {
            telefono: telephone,
            ci_usuario: userId
        }
    });

    return sqlRes.success ? telephone : null;
}

export async function postTelNumbers(userId: number, telephones: number[]): Promise<number[]> {
    const results = await Promise.all(
        telephones.map(tel => postTelNumber(userId, tel))
    );
    
    return results.filter(isNotUndefined);
}

async function deleteTelNumber(userId: number, telephone: number): Promise<number | null> {
    const sqlRes = await dbConn.delete({
        table: "usuario_telefono",
        conditions: [
            { column: "ci_usuario", operation: "=", value: userId },
            { column: "telefono", operation: "=", value: telephone }
        ]
    });

    return sqlRes.success ? telephone : null;
}

export async function deleteTelNumbers(userId: number, telephones: number[]): Promise<number[]> {
    const results = await Promise.all(
        telephones.map(tel => deleteTelNumber(userId, tel))
    );
    
    return results.filter(isNotUndefined);
}
