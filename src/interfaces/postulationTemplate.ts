
export interface DbPostulationTemplate {
    id_necesidad: number,
    ci_postulante: number
}

export interface PostulationTemplate {
    necessityId: number,
    userId: number
}

export function postulationTemplateToDb(info: PostulationTemplate): DbPostulationTemplate {
    return {
        id_necesidad: info.necessityId,
        ci_postulante: info.userId
    };
}
