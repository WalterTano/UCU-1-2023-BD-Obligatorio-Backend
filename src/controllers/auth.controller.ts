import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/jwt.helper';
import { throwIfUndef } from '../lib';
import { RequestHandler } from 'express';
import { findByCredentials, findByCI } from '../models/user';

const BCRYPT_SALT = throwIfUndef(process.env.BCRYPT_SALT, "BCRYPT_SALT");

export const doAuth: RequestHandler = async (req, res) => {
    const { ci, password } = req.body;

    if (!ci || !password) {
        return res.status(400).json({
            success: false,
            message: `Auth request must include CI and password fields in the request's body.`
        });
    }

    const hashpwd = await bcrypt.hash(password, BCRYPT_SALT);
    const user = await findByCredentials(ci, hashpwd);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: `No user was found for CI ${ci} or password was incorrect.`
        });
    }
    
    const token = await generateJWT(ci, user.id.toString());

    return res.status(200).json({
        success: true,
        data: {
            user: user,
            token: token
        }
    });
};

export const renewToken: RequestHandler = async (req, res) => {
    const { ci } = (req as any);
    if (!ci) {
        return res.status(403).json({
            success: false,
            message: 'Authentication token not valid or expired.'
        });
    }

    const userId = parseInt(ci);
    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid type for uid. Type must be numeric or a string with numeric value.'
        });
    }

    // Update this to use the new database.
    const user = await findByCI(ci);

    if (!user) {
        res.status(404).json({
            success: false,
            message: `No user was found for CI ${ci}`
        });
        return;
    }

    const token = await generateJWT( ci, user.id.toString() );

    return res.status(200).json({
        success: true,
        data: {
            user,
            token
        }
    });
};
