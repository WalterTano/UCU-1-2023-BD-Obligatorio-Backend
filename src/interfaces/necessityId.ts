export interface DbNecessityId {
    id: number,
    ci_creador: number
}

export interface NecessityId {
    necId: number,
    userId: number
}

// TODO: do the same to skillOfUserId
export function necessityIdFromDb(info: DbNecessityId): NecessityId {
    return {
        necId: info.id,
        userId: info.ci_creador
    };
}
