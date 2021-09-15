import bcrypt from 'bcryptjs'
import jsonwt from 'jsonwebtoken'
import logger from '../setup/logger.js'
import { jwtSecret } from '../utils/environment.js'
import BazaarUser from '../models/bazaarUsers.js'

const findUser = async (email) => {
    return await BazaarUser.findOne({email});
}

const getToken = (payload) => {
    const token = jsonwt.sign({
        payload
    }, jwtSecret, { expiresIn: '5d' });
    return token;
}

const saveToken = async(id,token) => {
    try{
    const user = await BazaarUser.findById(id);
    user.token.push(token);
    let saveUser = new BazaarUser(user);
    const status = await saveUser.save();
    if(!status) throw '--error token not saved'
    return true;
    }
    catch(error){
        logger.error(error.message);
        return false;
    }
}

/**
 * @route /public/register
 * @param {name,email,password,phoneNumber} req 
 * @param {userId,token} res 
 */
export const register = async (req, res) => {
    let { name, email, password, phoneNumber } = req.body;
    let token;
    let hashPassword
    try{
    const checkUser = await BazaarUser.findOne({email});
    if(checkUser)
    throw new Error('User already exists');
    }
    catch(error){
        logger.error(error.message);
        res.status(401).json({ message: "User already exists", data: false }).end();
        return;
    }
    try {
            hashPassword = await bcrypt.hash(password, 8)
            if(!hashPassword) throw new Error('--password not hashed');
    }
    catch (error) {
        logger.error(error.message);
        res.status(401).json({ message: "--error occurred while hashing password", data: false }).end();
        return;
    }
    const data = {
        name: name,
        email: email,
        password: hashPassword,
        phoneNumber:phoneNumber
    }
    try{
        const NewUser = new BazaarUser(data);
        const user = await NewUser.save();
        const payload = user._id;
        token = getToken(payload);
        if(!token) throw new Error('--error token not generated')
        const tokenStatus = await saveToken(user._id,token);
        if(!tokenStatus) throw new Error('--error occurred while saving token');
        logger.info(`--success user created : ${email}`);
        res.status(201).json({ message: 'user registered successfully', status: true, token: 'Bearer ' + token }).end();
        return;
    }
    catch(error){
        logger.error(error);
        res.status(401).json({ message: "--error occurred while saving user", status: false, token: false }).end();
        return;
    }
}

/**
 * @route /public/login
 * @param {email,password} req 
 * @param {token} res 
 */
export const logIn = async (req, res) => {
    const { email, password } = req.body;
    try{
        const checkUser = await findUser(email);
        if(!checkUser) throw new Error('Email not found');
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if(!checkPassword) throw new Error('Incorrect password');
        const token = getToken({id:checkUser._id});
        if(!token) throw new Error('Token not generated');
        const tokenStatus = await saveToken(checkUser._id,token);
        if(!tokenStatus) throw new Error('Error occurred while saving token');
        logger.info(`--success user logged in : ${checkUser.email}`);
        res.status(201).json({ message: 'user logged in successfully', status: true, token: 'Bearer ' + token }).end();
        return;
    }
    catch(error){
        logger.error(error.message);
        res.status(401).json({ message: error.message, status: false, token: false }).end();
        return;
    }
}