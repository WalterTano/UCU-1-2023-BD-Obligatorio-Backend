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

export async function getSkillOfUser(ci: number, skillId: number): Promise<SkillOfUser | undefined> {
    const sqlRes = await dbConn.select({
        columns: ["id_hab", "fecha_creacion", "descripcion"],
        table: "usuario_tiene_habilidad",
        conditions: [
            { column: "ci", operation: "=", value: ci },
            { column: "id_hab", operation: "=", value: skillId }
        ]
    });

    if (!sqlRes.success) {
        throw new Error(sqlRes.errorMessage);
    }

    return sqlRes.data.at(0);
}

export async function getSkills(skillIds: number[]): Promise<Skill[]> {
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

export async function getSkill(skillId: number): Promise<Skill | undefined> {
    const sqlRes = await dbConn.select({
        columns: ["id", "nombre"],
        table: "habilidad",
        conditions: [
            { column: "id", operation: "=", value: skillId }
        ]
    });

    if (!sqlRes.success) {
        throw new Error(sqlRes.errorMessage);
    }

    return sqlRes.data.at(0);
}
