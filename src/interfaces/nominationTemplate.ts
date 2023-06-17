
export interface DbNominationTemplate {
    id_necesidad: number,
    ci_postulante: number
}

export interface NominationTemplate {
    necessityId: number,
    userId: number
}

export function nominationTemplateToDb(info: NominationTemplate): DbNominationTemplate {
    return {
        id_necesidad: info.necessityId,
        ci_postulante: info.userId
    };
}
