export interface DbSkillOfUser {
    nombre_habilidad: string,
    fecha_creacion: Date,
    descripcion: string | null,
}

export interface SkillOfUser {
    skillName: string,
    description: string | null,
    creationDate: Date
}

export function skillOfUserFromDb(info: DbSkillOfUser): SkillOfUser {
    return {
        skillName: info.nombre_habilidad,
        description: info.descripcion,
        creationDate: info.fecha_creacion
    };
}
