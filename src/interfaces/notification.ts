export interface DbNotification {
    id: number,
    ci_usuario: number,
    mensaje: string,
    fecha: Date
}

// It's called like this because there's already a class called 'Notification'
export interface ApiNotification {
    id: number,
    userId: number,
    msg: string,
    date: Date
}

export function notificationFromDb(info: DbNotification): ApiNotification {
    return {
        id: info.id,
        userId: info.ci_usuario,
        msg: info.mensaje,
        date: info.fecha
    };
}
