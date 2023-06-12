
// This function exists because a lambda function cannot act as type guards
export function isNotUndefined<T>(v: T): v is NonNullable<T> {
    return typeof v != undefined;
}
