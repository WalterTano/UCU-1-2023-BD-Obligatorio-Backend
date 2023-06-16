import { throwIfUndef } from "../lib";
import bcrypt from 'bcryptjs';

const BCRYPT_SALT = throwIfUndef(process.env.BCRYPT_SALT, "BCRYPT_SALT");

export async function encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, BCRYPT_SALT);
}
