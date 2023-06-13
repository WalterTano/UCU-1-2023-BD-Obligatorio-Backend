export interface DbNecessity {
    id: number,
    ci_creador: number,
    descripcion: string,
    estado: string,
    lat_ubicacion: number,
    long_ubicacion: number,
    fecha_inicio: Date,
    fecha_fin: Date | null,
    fecha_solucionada: Date | null,
    titulo: string
}

export interface Necessity {
    necId: number,
    userId: number,
    description: string,
    state: string,
    latitude: number,
    longitude: number,
    startDate: Date,
    endDate: Date | null,
    solvedDate: Date | null,
    title: string
}

export function necessityFromDb(info: DbNecessity): Necessity {
    return {
        necId: info.id,
        userId: info.ci_creador,
        description: info.descripcion,
        state: info.estado,
        latitude: info.lat_ubicacion,
        longitude: info.long_ubicacion,
        startDate: info.fecha_inicio,
        endDate: info.fecha_fin,
        solvedDate: info.fecha_solucionada,
        title: info.titulo
    };
}

export function necessityToDb(info: Necessity): DbNecessity {
    return {
        id: info.necId,
        ci_creador: info.userId,
        descripcion: info.description,
        estado: info.state,
        lat_ubicacion: info.latitude,
        long_ubicacion: info.longitude,
        fecha_inicio: info.startDate,
        fecha_fin: info.endDate,
        fecha_solucionada: info.solvedDate,
        titulo: info.title
    };
}
