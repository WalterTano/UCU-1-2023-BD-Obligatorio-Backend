export function throwIfUndef<T>(v: T, name: string): NonNullable<T> {
    if (v == undefined) {
        throw new Error(JSON.stringify(name) + " cannot be undefined");
    }

    return v;
}
