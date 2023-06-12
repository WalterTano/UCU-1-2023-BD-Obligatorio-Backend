import dbConn from "../configs/db.config";
import { mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbSkill, Skill, skillFromDb } from "../interfaces/skill";
import { DbSkillOfUser, SkillOfUser, skillOfUserFromDb } from "../interfaces/skillOfUser";
import { DbSkillOfUserId, SkillOfUserId } from "../interfaces/skillOfUserId";
import { SkillOfUserTemplate } from "../interfaces/skillOfUserTemplate";
import { Result } from "../types/result";

export async function getAllSkills(): Promise<Skill[]> {
    const sqlRes = await dbConn.select({
        columns: ["id", "nombre"],
        table: "habilidad"
    });

    const res: DbSkill[] = unwrapResult(sqlRes);

    return res.map(skillFromDb);
}

export async function getSkillsOfUser(ci: number): Promise<SkillOfUser[]> {
    const sqlRes = await dbConn.select({
        columns: ["id_hab", "fecha_creacion", "descripcion"],
        table: "usuario_tiene_habilidad",
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    const res: DbSkillOfUser[] = unwrapResult(sqlRes);

    return res.map(skillOfUserFromDb);
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

    const res: DbSkillOfUser | undefined = unwrapResult(sqlRes).at(0);

    return res && skillOfUserFromDb(res);
}

export async function getSkillsById(skillIds: number[]): Promise<Skill[]> {
    const sqlRes = await dbConn.select({
        columns: ["id", "nombre"],
        table: "habilidad",
        conditions: [
            { column: "id", operation: "IN", value: skillIds }
        ]
    });

    const res: DbSkill[] = unwrapResult(sqlRes);

    return res.map(skillFromDb);
}

export async function getSkillById(skillId: number): Promise<Skill | undefined> {
    const sqlRes = await dbConn.select({
        columns: ["id", "nombre"],
        table: "habilidad",
        conditions: [
            { column: "id", operation: "=", value: skillId }
        ]
    });

    const res: DbSkill | undefined = unwrapResult(sqlRes).at(0);

    return res && skillFromDb(res);
}

async function getIdOfSkill(name: string): Promise<number | undefined> {
    const sqlRes = await dbConn.select({
        columns: ["id"],
        table: "habilidad",
        conditions: [
            { column: "nombre", operation: "=", value: name }
        ]
    });

    const res: {id: number} | undefined = unwrapResult(sqlRes).at(0);

    return res && res.id;
}

// TODO: Change return type to Promise<Result<SkillOfUserId>>
export async function newSkillOfUser(ci: number, info: SkillOfUserTemplate): Promise<Result<SkillOfUserId>> {
    const hab = info.skillId;
    const habId = typeof hab === "number" ? hab : await getIdOfSkill(hab);
    if (habId == undefined) {
        return { success: false, errorMessage: "Unknown skill" };
    }

    const sqlRes = await dbConn.insert({
        idColumns: ["id_hab", "ci"],
        table: "usuario_tiene_habilidad",
        values: {
            id_hab: habId,
            ci: ci,
            descripcion: info.description || null
        }
    });

    return mapResult(sqlRes, raw => {
        const data: DbSkillOfUserId = raw[0];
        return { ci: data.userId, id_hab: data.skillId };
    });
}

export async function deleteSkillOfUser(id: SkillOfUserId): Promise<Result<void>> {
    const sqlRes = await dbConn.delete({
        table: "usuario_tiene_habilidad",
        conditions: [
            { column: "ci", operation: "=", value: id.ci },
            { column: "id_hab", operation: "=", value: id.id_hab }
        ]
    });
    return mapResult(sqlRes, _ => void 0);
}

export async function updateSkillOfUser(id: SkillOfUserId, newDescripcion: string | null): Promise<Result<void>> {
    const sqlRes = await dbConn.update({
        table: "usuario_tiene_habilidad",
        values: {
            descripcion: newDescripcion
        },
        conditions: [
            { column: "ci", operation: "=", value: id.ci },
            { column: "id_hab", operation: "=", value: id.id_hab }
        ]
    });
    return mapResult(sqlRes, _ => void 0);
}
