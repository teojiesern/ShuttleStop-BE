const Product = require('../models/ProductSchema');

const getProductsByIds = async (productIds) => {
    return await Product.find({ productId: { $in: productIds } });
};

module.exports = {
    getProductsByIds,
};
