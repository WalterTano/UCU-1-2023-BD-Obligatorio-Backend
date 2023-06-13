export interface DbSkill {
    id: number,
    nombre: string
}

export interface Skill {
    id: number,
    name: string
}

export function skillFromDb(info: DbSkill): Skill {
    return {
        id: info.id,
        name: info.nombre
    };
}

export function skillToDb(info: Skill): DbSkill {
    return {
        id: info.id,
        nombre: info.name
    };
}
