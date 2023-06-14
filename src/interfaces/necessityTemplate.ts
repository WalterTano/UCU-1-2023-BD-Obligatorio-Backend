export interface DbNecessityTemplate {
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

export interface NecessityTemplate {
    id: number,
    userId: number,
    description: string,
    state: string,
    latitude: number,
    longitude: number,
    startDate: Date,
    endDate?: Date | null,
    solvedDate?: Date | null,
    title: string
}

export function necessityTemplateToDb(info: NecessityTemplate): DbNecessityTemplate {
    return {
        id: info.id,
        ci_creador: info.userId,
        descripcion: info.description,
        estado: info.state,
        lat_ubicacion: info.latitude,
        long_ubicacion: info.longitude,
        fecha_inicio: info.startDate,
        fecha_fin: info.endDate || null,
        fecha_solucionada: info.solvedDate || null,
        titulo: info.title
    };
}
