import jwt from 'jsonwebtoken';
import { throwIfUndef } from '../lib';

const EXPIRES_IN = throwIfUndef(process.env.JWT_EXPIRES_IN, "JWT_EXPIRES_IN");
const SECRET_JWT_SEED = throwIfUndef(process.env.SECRET_JWT_SEED, "SECRET_JWT_SEED");

export function generateJWT(uid: string, name: string, expiresIn: string = EXPIRES_IN): Promise<string | undefined> {
    const payload = { ci: uid, name };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_JWT_SEED, { expiresIn }, (err, token) => {
            if (err) {
                console.log(err);
                reject();
            } else {
                resolve(token);
            }
        });
    });
}
