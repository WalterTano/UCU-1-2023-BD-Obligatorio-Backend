import { RequestHandler } from "express";

// ArrToObj<["a", "b", "c"]> = { a: string, b: string, c: string }
type ArrToObj<T extends string[]> = {
    [index in (T[keyof T] & string)]: string
};

export type Handler<K extends string[]> = RequestHandler<ArrToObj<K>>;
