import express from 'express'
import { addToCart, readCart } from '../controllers/cart.js';
const router = express.Router();

router.post('/add_to_cart',(req,res) =>  addToCart(req,res));
router.get('/read_cart',(req,res) => readCart(req,res));

export default router;