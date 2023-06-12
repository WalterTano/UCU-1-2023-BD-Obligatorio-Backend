export type Result<T> = { success: true, data: T } | { success: false, errorMessage: string };
