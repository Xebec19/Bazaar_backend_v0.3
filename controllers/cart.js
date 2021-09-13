
/**
 * @route /api/add_to_cart
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const addToCart = (req, res) => {
    res.status(201).json({ message: 'Add to cart', status: true, data: true }).end();
    return;
}