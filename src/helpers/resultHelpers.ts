import { Result } from "../types/result";

export function unwrapResult<T>(res: Result<T>): T {
    if (!res.success) {
        throw new Error(res.errorMessage);
    } else {
        return res.data;
    }
}

export function mapResult<T, U>(res: Result<T>, fn: (v: T) => U): Result<U> {
    if (res.success) {
        return { success: true, data: fn(res.data) };
    } else {
        return res;
    }
}
