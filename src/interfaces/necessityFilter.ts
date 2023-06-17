export interface NecessityFilter {
    skills?: string[],
    startDate?: DateRange,
    endDate?: DateRange,
    // TODO: Make sure it's surrounded by '%' before query
    searchTerm?: string
}

export interface DateRange {
    min?: Date,
    max?: Date
}
