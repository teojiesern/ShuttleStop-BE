const Product = require('../models/ProductSchema');

const getAllProducts = async () => {
    const products = await Product.find({});
    return products;
};

const getProductById = async (productId) => {
    const product = await Product.findOne({ productId: productId });
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
};
