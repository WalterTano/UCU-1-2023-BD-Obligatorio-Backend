import { Result } from "../types/result";

// TODO: integrate function wherever an exception is thrown if result.success == false
export function unwrapResult<T>(res: Result<T>): T {
    if (!res.success) {
        throw new Error(res.errorMessage);
    } else {
        return res.data;
    }
}
