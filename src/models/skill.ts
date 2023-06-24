import dbConn from "../configs/db.config";
import { chainResult, mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbSkillOfUser, SkillOfUser, skillOfUserFromDb } from "../interfaces/skillOfUser";
import { SkillOfUserId } from "../interfaces/skillOfUserId";
import { SkillOfUserTemplate, skillOfUserTemplateToDb } from "../interfaces/skillOfUserTemplate";
import { Result } from "../types/result";

export async function getAllSkills(): Promise<{ name: string }[]> {
    const sqlRes = await dbConn.select({
        columns: ["nombre"],
        table: "habilidad"
    });

    const res: { nombre: string }[] = unwrapResult(sqlRes);

    return res.map(v => ( { name: v.nombre } ));
}

export async function getSkillsOfUser(ci: number): Promise<SkillOfUser[]> {
    const sqlRes = await dbConn.select({
        columns: ["nombre_habilidad", "fecha_creacion", "descripcion"],
        table: "usuario_tiene_habilidad",
        conditions: [
            { column: "ci", operation: "=", value: ci }
        ]
    });

    const res: DbSkillOfUser[] = unwrapResult(sqlRes);

    return res.map(skillOfUserFromDb);
}

export async function getSkillOfUser(ci: number, skillId: string): Promise<SkillOfUser | undefined> {
    const sqlRes = await dbConn.select({
        columns: ["nombre_habilidad", "fecha_creacion", "descripcion"],
        table: "usuario_tiene_habilidad",
        conditions: [
            { column: "ci", operation: "=", value: ci },
            { column: "nombre_habilidad", operation: "=", value: skillId }
        ]
    });

    const res: DbSkillOfUser | undefined = unwrapResult(sqlRes).at(0);

    return res && skillOfUserFromDb(res);
}

export async function newSkillOfUser(ci: number, info: SkillOfUserTemplate): Promise<Result<SkillOfUserId>> {
    const sqlRes = await dbConn.insert({
        idColumns: ["nombre_habilidad", "ci"],
        table: "usuario_tiene_habilidad",
        values: skillOfUserTemplateToDb(ci, info)
    });

    return mapResult(sqlRes, () => ({
        skillName: info.skillName,
        userId: ci
    }));
}

export async function updateSkillOfUser(id: SkillOfUserId, newDescripcion: string | null): Promise<Result<number>> {
    const res = await dbConn.update({
        table: "usuario_tiene_habilidad",
        values: {
            descripcion: newDescripcion
        },
        conditions: [
            { column: "ci", operation: "=", value: id.userId },
            { column: "nombre_habilidad", operation: "=", value: id.skillName }
        ]
    });

    return chainResult(res,
        data => data == undefined
            ? { success: false, errorMessage: "At least one field must be included in the template" }
            : { success: true, data }
    );
}

export async function deleteSkillOfUser(id: SkillOfUserId): Promise<Result<void>> {
    const sqlRes = await dbConn.delete({
        table: "usuario_tiene_habilidad",
        conditions: [
            { column: "ci", operation: "=", value: id.userId },
            { column: "nombre_habilidad", operation: "=", value: id.skillName }
        ]
    });

    return chainResult(sqlRes,
        data => data > 0
            ? { success: true, data: void 0 }
            : { success: false, errorMessage: "Record not found" }
    );
}
