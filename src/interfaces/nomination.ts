export interface DbNomination {
    id_necesidad: number,
    ci_postulante: number,
    estado: string,
    fecha_creacion: Date
}

export interface Nomination {
    necessityId: number,
    userId: number,
    status: string,
    creationDate: Date
}

export function nominationFromDb(info: DbNomination): Nomination {
    return {
        necessityId: info.id_necesidad,
        userId: info.ci_postulante,
        status: info.estado,
        creationDate: info.fecha_creacion
    };
}
