export interface DbRequirement {
    nombre_habilidad: string,
    id_necesidad: number
}

export interface Requirement {
    skillName: string,
    necessityId: number
}

export function requirementFromDb(info: DbRequirement): Requirement {
    return {
        necessityId: info.id_necesidad,
        skillName: info.nombre_habilidad
    };
}

export function requirementToDb(info: Requirement): DbRequirement {
    return {
        id_necesidad: info.necessityId,
        nombre_habilidad: info.skillName
    };
}
