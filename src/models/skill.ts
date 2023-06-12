import dbConn from "../configs/db.config";
import { unwrapResult } from "../helpers/unwrapResult";
import { Skill } from "../interfaces/skill";
import { SkillOfUser } from "../interfaces/skillOfUser";
import { SkillOfUserTemplate } from "../interfaces/skillOfUserTemplate";

export async function getAllSkills(): Promise<Skill[]> {
    const sqlRes = await dbConn.select({
        columns: ["id", "nombre"],
        table: "habilidad"
    });

    return unwrapResult(sqlRes);
}

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

export async function getSkillsById(skillIds: number[]): Promise<Skill[]> {
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

export async function getSkillById(skillId: number): Promise<Skill | undefined> {
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
async function getIdOfSkill(name: string): Promise<number | undefined> {
    const sqlRes = await dbConn.select({
        columns: ["id"],
        table: "habilidad",
        conditions: [
            { column: "nombre", operation: "=", value: name }
        ]
    });

    if (!sqlRes.success) {
        throw new Error(sqlRes.errorMessage);
    }

    const res = sqlRes.data.at(0);
    return res && res.id;
}

type SkillOfUserId = {id_hab: number, ci: number};
export async function newSkillOfUser(ci: number, info: SkillOfUserTemplate): Promise<SkillOfUserId> {
    const hab = info.habilidad;
    const habId = typeof hab === "number" ? hab : await getIdOfSkill(hab);
    if (habId == undefined) {
        throw new Error("Unknown skill");
    }

    const sqlRes = await dbConn.insert({
        idColumns: ["id_hab", "ci"],
        table: "usuario_tiene_habilidad",
        values: {
            id_hab: habId,
            ci: ci,
            descripcion: info.descripcion || null
        }
    });

    return unwrapResult(sqlRes)[0];
}

