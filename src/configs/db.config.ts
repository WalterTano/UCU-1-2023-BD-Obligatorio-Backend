import { throwIfUndef } from '../lib';
import { PostgresConnection } from '../db/classes/postgresConnection';
import { DatabaseConnection } from '../db/interfaces/databaseConnection';

const DATABASE = throwIfUndef(process.env.POSTGRES_DATABASE, "POSTGRES_DATABASE");
const USERNAME = throwIfUndef(process.env.POSTGRES_USERNAME, "POSTGRES_USERNAME");
const PASSWORD = throwIfUndef(process.env.POSTGRES_PASSWORD, "POSTGRES_PASSWORD");
const HOST = throwIfUndef(process.env.POSTGRES_HOST, "POSTGRES_HOST");
const PORT = parseInt(throwIfUndef(process.env.POSTGRES_PORT, "POSTGRES_PORT"));

const dbConn: DatabaseConnection = new PostgresConnection({
    hostname: HOST,
    port: PORT,
    database: DATABASE,
    username: USERNAME,
    password: PASSWORD
});

export default dbConn;
