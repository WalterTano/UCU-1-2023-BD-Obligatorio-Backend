
// This function exists because a lambda function cannot act as type guards
export function isString(v: any): v is string {
    return typeof v === "string";
}
