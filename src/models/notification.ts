import dbConn from "../configs/db.config";
import { SelectQuery } from "../db/interfaces/selectQuery";
import { chainResult, mapResult, unwrapResult } from "../helpers/resultHelpers";
import { DbNotification, ApiNotification, notificationFromDb } from "../interfaces/notification";
import { NotificationTemplate, notificationTemplateToDb } from "../interfaces/notificationTemplate";
import { Result } from "../types/result";

async function selectAllFromNotifications(query: Omit<SelectQuery, "table" | "columns">): Promise<DbNotification[]> {
    const sqlRes = await dbConn.select({
        table: "notificacion",
        ...query
    });

    const res: DbNotification[] = unwrapResult(sqlRes);
    return res;
}

export async function getNotifications(): Promise<ApiNotification[]> {
    const res = await selectAllFromNotifications({});
    return res.map(notificationFromDb);
}

export async function getNotification(id: number): Promise<ApiNotification | undefined> {
    const sqlRes = await selectAllFromNotifications({
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });

    const res = sqlRes.at(0);
    return res && notificationFromDb(res);
}

export async function postNotification(template: NotificationTemplate): Promise<Result<number>> {
    const res = await dbConn.insert({
        table: "notificacion",
        idColumns: ["id"],
        values: notificationTemplateToDb(template)
    });

    return mapResult(res, data => data.id);
}

export async function putNotification(id: number, newMsg: string): Promise<Result<number>> {
    const res = await dbConn.update({
        table: "notificacion",
        values: {
            mensaje: newMsg
        },
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });

    return chainResult(res,
        data => data == undefined
            ? { success: false, errorMessage: "At least one field must be included in the template" }
            : { success: true, data }
    );
}

export async function deleteNotification(id: number): Promise<Result<void>> {
    const sqlRes = await dbConn.delete({
        table: "notificacion",
        conditions: [
            { column: "id", operation: "=", value: id }
        ]
    });

    return chainResult(sqlRes,
        data => data > 0
            ? { success: true, data: void 0 }
            : { success: false, errorMessage: "Record not found" }
    );
}
