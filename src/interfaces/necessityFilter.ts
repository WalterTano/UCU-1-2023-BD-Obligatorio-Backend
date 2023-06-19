export interface NecessityFilter {
    ids?: number[],
    skills?: string[],
    startDate?: DateRange,
    endDate?: DateRange,
    searchTerm?: string
}

export interface DateRange {
    min?: Date,
    max?: Date
}
