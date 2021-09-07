import bcrypt from 'bcryptjs'
import jsonwt from 'jsonwebtoken'

import logger from '../setup/logger.js'
import { jwtSecret } from '../utils/environment.js'

/**
 * @route /public/register
 * @param {name,email,password,phoneNumber} req 
 * @param {userId,token} res 
 */
export const register = async (req, res) => {
    let { name, email, password, phoneNumber } = req.body;
    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) throw new Error(err);
                if (!hash) throw new Error(err);
                password = hash;
            });
        });
    }
    catch (error) {
        logger.error(error.message);
        res.status(401).json({ message: "--error occurred while hashing password", data: false }).end();
    }
    const payload = { email };
    try {
        if (!jwtSecret) throw new Error('Secret is not defined');
        const token = jsonwt.sign({
            data: 'foobar'
        }, 'secret', { expiresIn: '1h' });
        ;
        if (!token) throw new Error('Token not generated');
        res.status(201).json({ message: 'user registered successfully', status: true, token: 'Bearer' + token }).end();
    }
    catch (error) {
        logger.error(error);
        res.status(401).json({ message: "--error occurred while generating token", status: false, token: false }).end();
    }
}

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    res.status(201).json({ message: 'Well done' }).end();
}