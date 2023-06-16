export interface SkillOfUserTemplate {
    skillName: string,
    description?: string | null
}

export interface DbSkillOfUserTemplate {
    ci: number,
    nombre_habilidad: string,
    descripcion: string | null
}

export function skillOfUserTemplateToDb(ci: number, info: SkillOfUserTemplate): DbSkillOfUserTemplate {
    return {
        ci: ci,
        nombre_habilidad: info.skillName,
        descripcion: info.description || null
    };
}
