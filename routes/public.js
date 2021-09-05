import express from 'express'
import {register,logIn} from '../controllers/authorization.js'

const router = express.Router();

/**
 * @route /public/register
 */
router.post('/register',(req,res) =>  register(req,res));

/**
 * @route /public/login
 */
router.post('/login',(req,res) =>  logIn(req,res));

export default router;