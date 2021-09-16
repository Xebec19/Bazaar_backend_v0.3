import BazaarProduct from "../models/bazaarProducts.js";
import logger from "../setup/logger.js";
const dbp = BazaarProduct;

export const findProductById = async (id) => {
    try {
        const product = await dbp.findById(id).limit(1);
        if(!product) throw new Error('findProductById','no product found');
        logger.info('findProductById',`fetched product of id : ${id}`);
        return product;
    }
    catch(error){
        logger.error(error.message);
        return false;
    }
}