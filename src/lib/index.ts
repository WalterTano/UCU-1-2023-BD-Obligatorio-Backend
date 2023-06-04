export function throwIfUndef<T>(v: T, name: string): NonNullable<T> {
    if (v == undefined) {
        throw new Error(JSON.stringify(name) + " cannot be undefined");
    }

    return v;
}

export function takeFirst<T>(arr: readonly T[]): (readonly [T, readonly T[]]) | undefined {
    return arr.length == 0 ? undefined : [arr[0], arr.slice(1)];
}
