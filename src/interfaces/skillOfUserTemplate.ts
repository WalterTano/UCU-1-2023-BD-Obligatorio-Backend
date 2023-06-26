export interface DbSkillOfUserTemplate {
    ci: number,
    nombre_habilidad: string,
    descripcion: string | null
}

export interface SkillOfUserTemplate {
    name: string,
    description?: string | null
}

export function skillOfUserTemplateToDb(ci: number, info: SkillOfUserTemplate): DbSkillOfUserTemplate {
    return {
        ci: ci,
        nombre_habilidad: info.name,
        descripcion: info.description || null
    };
}
