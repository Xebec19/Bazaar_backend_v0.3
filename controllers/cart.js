import BazaarProduct from "../models/bazaarProducts.js"
import BazaarUser from "../models/bazaarUsers.js"
import logger from "../setup/logger.js"
import { findUserByToken } from '../utils/user.js'
import { findProductById } from "../utils/product.js"
import { calcTotal } from '../utils/cart.js'
const dbp = BazaarProduct;
const dbu = BazaarUser;
/**
 * @route /api/add_to_cart
 * @param {productId:string,qty:number} req 
 * @param {*} res 
 * @returns 
 */
export const addToCart = async (req, res) => {
    const { productId, qty } = req.body;
    try {
        if (!productId || !qty) throw new Error('invalid parameters');
        let token = req.headers['authorization'];
        const user = await findUserByToken(token);
        if (!user) throw new Error('no user found');
        const product = await findProductById(productId);
        if (!product) throw new Error('no product found');
        if (product.quantity < qty) throw new Error('out of stock');
        if (!product.price) throw new Error('Price can not be null');
        user.cart.push({ productId: product._id, quantity: qty, price: product.price });
        await dbu.updateOne({ _id: user._id }, { $set: { cart: user.cart } });
        const total = await calcTotal(user._id);
        if (!(total >= 0)) throw new Error('invalid total');
        await dbu.updateOne({ _id: user._id }, { $set: { total: total } });
        await dbp.updateOne({ _id: product._id }, { $set: { quantity: (product.quantity - qty) } });
        logger.info(`cart updated of user ${user.email}`);
        res.status(201).json({ message: 'Add to cart', status: true, data: true }).end();
        return;
    }
    catch (error) {
        logger.error(error.message);
        res.status(401).json({ message: error.message, status: false, data: false }).end();
        return;
    }
}
/**
 * @route /api/read_cart
 * @param {} req 
 * @param {cart:[{}],total:number} res 
 * @type GET
 * @returns user's cart and total
 */
export const readCart = async(req,res) => {
    const {userId} = req.body;
    try{
        let token = req.headers['authorization'];
        const user = await findUserByToken(token);
        if(!user) throw new Error('no user found');
        const total = calcTotal(user._id);
        if(!(total >= 0)) throw new Error('invalid total');
        res.status(201).json({ message: 'Cart fetched', status: true, data: {cart: user.cart, total: total} }).end();
        return;
    }
    catch(error){
        logger.info(error.message);
        res.status(401).json({ message: error.message, status: false, data: false }).end();
        return;
    }
}