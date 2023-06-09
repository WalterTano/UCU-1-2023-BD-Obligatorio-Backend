import { DeleteQuery } from "./queries/delete";
import { InsertQuery } from "./queries/insert";
import { SelectQuery } from "./queries/select";
import { UpdateQuery } from "./queries/update";
import { Result } from "./result";

export interface DatabaseConnection {
    select(q: SelectQuery): Promise<Result<any[]>>,
    insert(q: InsertQuery): Promise<Result<void>>,
    update(q: UpdateQuery): Promise<Result<number>>,
    delete(q: DeleteQuery): Promise<Result<number>>
}
