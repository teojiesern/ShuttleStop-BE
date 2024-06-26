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

const getProductsByIds = async (productIds) => {
    return await Product.find({ productId: { $in: productIds } });
};

const updateProduct = async (productId, productData) => {
    return await Product.findOneAndUpdate({ productId }, productData, { new: true });
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByIds,
    updateProduct,
};
