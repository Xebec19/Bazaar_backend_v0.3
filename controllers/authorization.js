import bcrypt from 'bcryptjs'
import * as jsonwt from 'jsonwebtoken'

import logger from '../setup/logger.js'
import { jwtSecret } from '../utils/environment.js'

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) throw new Error(err);
                password = hash;
            });
        });
    }
    catch (error) {
        logger.error(error);
        res.status(401).json({ message: "--error occurred while hashing password" }).end();
    }
    const payload = { email };
    try {
        jsonwt.sign(payload,)
    }
    catch (error) {
        logger.error(error);
        res.status(401).json({ message: "--error occurred while hashing password" }).end();
    }
    res.status(201).json({ message: 'Well done' }).end();
}

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    res.status(201).json({ message: 'Well done' }).end();
}