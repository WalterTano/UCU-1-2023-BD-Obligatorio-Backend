import { SelectQuery } from "./selectQuery";
import { InsertQuery } from "./insertQuery";
import { UpdateQuery } from "./updateQuery";
import { DeleteQuery } from "./deleteQuery";
import { Result } from "../../types/result";

export interface DatabaseConnection {
    select(q: SelectQuery): Promise<Result<any[]>>,
    insert(q: InsertQuery): Promise<Result<any>>,
    update(q: UpdateQuery): Promise<Result<number | undefined>>,
    delete(q: DeleteQuery): Promise<Result<number>>
}
