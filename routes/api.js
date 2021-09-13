import express from 'express'
import { addToCart } from '../controllers/cart.js';
const router = express.Router();

router.get('/add_to_cart',(req,res) =>  addToCart(req,res));

export default router;