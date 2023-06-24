import dbConn from "../configs/db.config";
import { SelectQuery } from "../db/interfaces/selectQuery";
import { unwrapResult } from "../helpers/resultHelpers";

async function selectAllFromSkills(query: Omit<SelectQuery, 'table' | 'columns'>): Promise<string[]> {
    const sqlRes = await dbConn.select({
        columns: ["nombre"],
        table: "habilidad",
        ...query
    });

    const res: { nombre: string }[] = unwrapResult(sqlRes);
    return res.map(v => v.nombre);
}

export function getSkills(): Promise<string[]> {
    return selectAllFromSkills({});
}

export async function thereIsSkill(name: string): Promise<boolean> {
    const res = await selectAllFromSkills({
        conditions: [
            { column: "nombre", operation: "=", value: name }
        ]
    });

    return res.length > 0;
}
