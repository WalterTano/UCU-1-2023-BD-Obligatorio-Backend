
import jwt from 'jsonwebtoken';
import { throwIfUndef } from "../lib";
import { RequestHandler } from 'express';

const SECRET_JWT_SEED = throwIfUndef(process.env.SECRET_JWT_SEED, "SECRET_JWT_SEED");

function jwtVerify(token: string): { ci: any, name: any } {
    const v1 = jwt.verify( token, SECRET_JWT_SEED );

    if (typeof v1 == "string") {
        throw new Error("Invalid token");
    }

    return { ci: v1.ci, name: v1.name };
}

export const validateJWT: RequestHandler = (req, res, next) => {
    let token = req.header('Authorization');

    if ( !token || !token.startsWith('Bearer ') ) {
        return res.status(400).json({
            success: false,
            message: 'Wrong authenticacion scheme. Please use the Bearer scheme.'
        });
    }

    // Removing the "Bearer " part from the token
    token = token.replace(/^Bearer\s+/, '');

    try {
        const { ci, name } = jwtVerify(token);
        (req as any).ci = ci;
        (req as any).name = name;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid or expired.'
        });
    }

    next();
}
