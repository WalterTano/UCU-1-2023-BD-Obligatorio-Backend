export interface Condition {
    column: string,
    operation: "=" | "<" | ">" | "<=" | ">=" | "LIKE" | "IN"
    value: any
}

