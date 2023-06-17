
// TODO: utilize UserFilter in getUser functions
export interface UserFilter {
    // TODO: Make sure it's surrounded by '%' before query
    firstName?: string,
    // TODO: Make sure it's surrounded by '%' before query
    lastName?: string,
    skills?: string[],
}
