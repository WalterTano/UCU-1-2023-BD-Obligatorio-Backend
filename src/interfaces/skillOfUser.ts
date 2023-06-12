export interface DbSkillOfUser {
    id_hab: number,
    descripcion: string | null,
    fecha_creacion: Date
}

export interface SkillOfUser {
    skillId: number,
    description: string | null,
    creationDate: Date
}

export function skillOfUserFromDb(info: DbSkillOfUser): SkillOfUser {
    return {
        skillId: info.id_hab,
        description: info.descripcion,
        creationDate: info.fecha_creacion
    };
}

export function skillOfUserToDb(info: SkillOfUser): DbSkillOfUser {
    return {
        id_hab: info.skillId,
        descripcion: info.description,
        fecha_creacion: info.creationDate
    };
}
