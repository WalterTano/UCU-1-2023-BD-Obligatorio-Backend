import { mapErrResult } from "../../helpers/resultHelpers";
import { Result } from "../../types/result";

// If the given result is an error, it's printed to stdout,
// and an error with a predetermined message is returned
export function filterError<T>(res: Result<T>, prefix: string): Result<T> {
    return mapErrResult(res, e => {
        console.log(`${prefix}: ${e}`);
        return prefix;
    });
}
