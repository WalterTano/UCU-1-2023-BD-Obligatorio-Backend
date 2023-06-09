import postgres from 'postgres';
import { throwIfUndef } from '../lib';

const DATABASE = throwIfUndef(process.env.POSTGRES_DATABASE, "POSTGRES_DATABASE");
const USERNAME = throwIfUndef(process.env.POSTGRES_USERNAME, "POSTGRES_USERNAME");
const PASSWORD = throwIfUndef(process.env.POSTGRES_PASSWORD, "POSTGRES_PASSWORD");
const HOST = throwIfUndef(process.env.POSTGRES_HOST, "POSTGRES_HOST");
const PORT = parseInt(throwIfUndef(process.env.POSTGRES_PORT, "POSTGRES_PORT"));

const sql = postgres({
    hostname: HOST,
    port: PORT,
    database: DATABASE,
    username: USERNAME,
    password: PASSWORD
});

export default sql;
