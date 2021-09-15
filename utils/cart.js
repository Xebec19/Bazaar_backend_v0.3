import { findUserByToken } from "./user.js";
import BazaarUser from "../models/bazaarUsers.js";
import logger from "../setup/logger.js";
import { findProductById } from "./product.js";
import { scsMsg } from "./messages.js";
const dbu = BazaarUser;

const errorMsg = async (message, func) => {
    const msg = `--error ${func} ${message}`
    return msg;
}

const successmsg = async (message, func) => {
    const msg = `--success ${func} ${message}`;
    return msg;
}

// it will calc of total of a users cart
const calcTotal = async (...cartArr) => {
    const cartItems = cartArr.flat();
    let total = cartItems.reduce((acc, el) => {
        acc += (el.price * el.quantity);
    }, 0);
    return total;
}

export const insertCart = async (token, productId, qty) => {
    const fn = 'insertCart';
    try {
        if (!token || !productId || !qty) throw new Error(errorMsg('invalid parameters', 'addToCart'));
        const user = await findUserByToken(token);
        if (!user) throw new Error(errorMsg('no user found', fn));
        const product = await findProductById(productId);
        if (!product) throw new Error(errorMsg('no product found', fn));
        user.cart.push({ productId: product._id, quantity: qty, price: product.price });
        user.total = calcTotal(user.cart);
        if (!total) throw new Error(errorMsg('invalid total', fn))
        await BazaarUser.updateOne({ _id: user._id }, { $set: { cart: user.cart, total: user.total } });
        logger.info(scsMsg(`cart updated of user ${user._id}`, fn));
        return true;
    }
    catch (error) {
        logger.error(error.message);
        return false;
    }
}