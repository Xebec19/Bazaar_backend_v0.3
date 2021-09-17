import { findUserById, findUserByToken } from "./user.js";
import BazaarUser from "../models/bazaarUsers.js";
import logger from "../setup/logger.js";
import { findProductById } from "./product.js";
const dbu = BazaarUser;

// it will calc of total of a users cart
export const calcTotal = async (id) => {
    try{
        const user = await findUserById(id);
        if(user.total){
            const total = user.cart.reduce((acc,el) => {
                return acc += (el.quantity * el.price) 
            },0);
            return total;
        }
        else return user.total;
    }
    catch(error){
        logger.error(error.message);
        return false;
    }
}

export const findProductInCart = async(productId,userId) => {
    try{
        await dbu.findOne({productId,_id:userId});
        return true;
    }
    catch(error){
        logger.error(error.message);
        return false;
    }
}