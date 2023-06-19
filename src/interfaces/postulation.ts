export interface DbPostulation {
    id_necesidad: number,
    ci_postulante: number,
    estado: string,
    fecha_creacion: Date
}

export interface Postulation {
    necessityId: number,
    userId: number,
    status: string,
    creationDate: Date
}

export function postulationFromDb(info: DbPostulation): Postulation {
    return {
        necessityId: info.id_necesidad,
        userId: info.ci_postulante,
        status: info.estado,
        creationDate: info.fecha_creacion
    };
}
