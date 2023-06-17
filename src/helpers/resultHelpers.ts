import { Result } from "../types/result";

export function unwrapResult<T>(res: Result<T>): T {
    if (res.success) {
        return res.data;
    } else {
        throw new Error(res.errorMessage);
    }
}

export function mapResult<T, U>(res: Result<T>, fn: (v: T) => U): Result<U> {
    if (res.success) {
        return { success: true, data: fn(res.data) };
    } else {
        return res;
    }
}

export function chainResult<T, U>(res: Result<T>, fn: (v: T) => Result<U>): Result<U> {
    if (res.success) {
        return fn(res.data);
    } else {
        return res;
    }
}
