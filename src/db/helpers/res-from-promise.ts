import { Result } from "../interfaces/result";

export async function resFromPromise<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        const res = await promise;
        return { success: true, data: res };
    } catch (e) {
        const msg = e instanceof Error ? e.message : (e as any).toString();
        return { success: false, errorMsg: msg };
    }
}
