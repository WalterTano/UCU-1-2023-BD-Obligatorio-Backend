import dbConn from "../configs/db.config";
import { Skill } from "../interfaces/skill";
import { SkillOfUser } from "../interfaces/skillOfUser";

export async function getSkillsOfUser(ci: number): Promise<SkillOfUser[]> {
    const sqlRes = await dbConn.select({
        columns: ["id_hab", "fecha_creacion", "descripcion"],
        table: "usuario_tiene_habilidad",
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    if (!sqlRes.success) {
        throw new Error(sqlRes.errorMessage);
    }

    return sqlRes.data;
}

export async function getSkillNames(skillIds: number[]): Promise<Skill[]> {
    const sqlRes = await dbConn.select({
        columns: ["id", "nombre"],
        table: "habilidad",
        conditions: [
            { column: "id", operation: "IN", value: skillIds }
        ]
    });

    if (!sqlRes.success) {
        throw new Error(sqlRes.errorMessage);
    }

    return sqlRes.data;
}
