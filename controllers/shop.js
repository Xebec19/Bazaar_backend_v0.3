import logger from "../setup/logger.js"
import BazaarProduct from "../models/bazaarProducts.js"
import BazaarCategories from "../models/bazzarCategories.js";
const dbp = BazaarProduct;
const dbc = BazaarCategory;

/**
 * @route it fetches a list of products
 * @param {number} limit 
 * @param {Object} filter 
 * @returns {Object[]} products
 */
const fetchProducts = async (limit = 0, filter = {}) => {
    if (!limit || limit > 100) {
        logger.error('Invalid limit!');
        return;
    }
    return dbp.find(filter).limit(+limit);
}

// Todo fetch categories from right table
const fetchCategories = async () => {
    return dbc.find({},{CategoryName:1,_id:0});
}
/**
 * @route /public/get_product
 * @param {limit:string} req  
 * @param {Object[]} res products
 * @returns returns a list of products 
 */
export const getProducts = async (req, res) => {
    const limit = req.query.limit;
    try {
        const products = await fetchProducts(limit);
        if (!products) throw new Error('No products found');
        logger.info('--products fetched');
        res.status(201).json({ message: "Products fetched", data: products, status: true }).end();
        return;
    } catch (error) {
        logger.error(error.message);
        res.status(401).json({ message: error.message, data: false, status: false }).end();
        return;
    }
}

export const getCategories = async (req,res) => {
    try{
        const categories = await fetchCategories();
        if(!categories.length) throw new Error('No Categories found');
        logger.info("--categories fetched");
        res.status(201).json({ message: "Categories fetched", data: categories, status: true }).end();
    }
    catch (error) {
        logger.error(error.message);
        res.status(401).json({ message: error.message, data: false, status: false }).end();
        return;
    }
}