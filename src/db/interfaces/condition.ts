export interface SimpleCondition {
    type?: void,
    column: string,
    operation: "=" | "<" | ">" | "<=" | ">=" | "LIKE" | "IN"
    value: any
}

export interface OrCondition {
    type: "disjunction",
    values: [Condition, ...Condition[]]
}

export type Condition = SimpleCondition | OrCondition;
