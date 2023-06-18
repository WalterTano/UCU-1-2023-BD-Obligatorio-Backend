import { DbNotification, ApiNotification } from "./notification";

export type DbNotificationTemplate = Omit<DbNotification, 'id' | 'fecha'>;

export type NotificationTemplate = Omit<ApiNotification, 'id' | 'date'>;

export function notificationTemplateToDb(info: NotificationTemplate): DbNotificationTemplate {
    return {
        ci_usuario: info.userId,
        mensaje: info.msg
    };
}
