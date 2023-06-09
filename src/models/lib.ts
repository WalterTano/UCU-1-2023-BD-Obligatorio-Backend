interface OkResult<T> {
    success: true,
    data: T
}

interface ErrResult {
    success: false,
    errorMsg: string
}

export type Result<T> = OkResult<T> | ErrResult;
