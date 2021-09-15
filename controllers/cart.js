import BazaarProduct from "../models/bazaarProducts.js"
import logger from "../setup/logger.js"
import { insertCart } from "../utils/cart.js";
import { errMsg } from "../utils/messages.js";
import { findUserByToken } from '../utils/user.js'
const dbp = BazaarProduct;
const fetchProduct = async (productId) => {
    try {
        const product = await dbp.findById(productId);
        if (!product) throw new Error('--error no product found');
        return product;
    }
    catch (error) {
        logger.error(error.message);
        return false;
    }
}
/**
 * @route /api/add_to_cart
 * @param {productId:string,qty:number} req 
 * @param {*} res 
 * @returns 
 */
export const addToCart = async (req, res) => {
    const { productId, qty } = req.body;
    const fn = 'addToCart';
    try {
        if (!productId || !qty) throw new Error(errMsg('invalid parameters', fn));
        let token = req.headers['authorization'];
        const cartStatus = await insertCart(token, productId, qty)
        if(!cartStatus) throw new Error(errMsg(`${productId} not added in cart`,fn));
        res.status(201).json({ message: 'Add to cart', status: true, data: token }).end();
        return;
    }
    catch (error) {
        logger.error(error.message);
        res.status(401).json({ message: error.message, status: false, data: false }).end();
        return;
    }
}