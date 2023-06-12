import dbConn from "../configs/db.config";

export async function getSkillsOfUser(ci: number): Promise<number[]> {
    const sqlRes = await dbConn.select({
        columns: ["id_hab"],
        table: "usuario_tiene_habilidad",
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    if (!sqlRes.success) {
        throw new Error(sqlRes.errorMessage);
    }

    return sqlRes.data.map(v => v.id_hab);
}

export async function getSkillNames(skillIds: number[]): Promise<string[]> {
    const sqlRes = await dbConn.select({
        columns: ["nombre"],
        table: "habilidad",
        conditions: [
            { column: "id", operation: "IN", value: skillIds }
        ]
    });

    if (!sqlRes.success) {
        throw new Error(sqlRes.errorMessage);
    }

    return sqlRes.data.map(v => v.nombre);
}
