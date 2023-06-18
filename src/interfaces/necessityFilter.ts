export interface NecessityFilter {
    skills?: string[],
    startDate?: DateRange,
    endDate?: DateRange,
    searchTerm?: string
}

export interface DateRange {
    min?: Date,
    max?: Date
}
