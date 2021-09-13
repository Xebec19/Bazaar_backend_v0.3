import express from 'express'
import {register,logIn} from '../controllers/authorization.js'
import { getProducts } from '../controllers/shop.js';

const router = express.Router();

/**
 * @route /public/register
 */
router.post('/register',(req,res) =>  register(req,res));

/**
 * @route /public/login
 */
router.post('/login',(req,res) =>  logIn(req,res));

/**
 * @route /public/get_product
 */
router.get('/get_product',(req,res) => getProducts(req,res));

export default router;