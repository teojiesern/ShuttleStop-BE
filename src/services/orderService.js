const Order = require('../models/OrderSchema');
const Product = require('../models/ProductSchema');
const ProductService = require('../services/productService');

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
};

const updateOrderStatus = async (trackingNumbers, newStatus) => {
    try {
        const result = await Order.updateMany(
            { 'products.trackingNumber': { $in: trackingNumbers } },
            { $set: { 'products.$[].status': newStatus } },
        );

        if (result.nModified == 0) {
            throw new Error('No CartItems found with the provided tracking numbers');
        }

        return result;
    } catch (error) {
        throw error;
    }
};

const shipOrders = async (trackingNumbers) => {
    for (let trackingNumber of trackingNumbers) {
        await Order.updateMany(
            { 'products.trackingNumber': trackingNumber },
            { $set: { 'products.$[elem].status': 'Shipping' } },
            { arrayFilters: [{ 'elem.trackingNumber': trackingNumber }] },
        );
    }
};

const updateProductRating = async (orderId, productIds, ratings) => {
    const result = await Order.updateOne({ orderId: orderId }, { $set: { rated: true } });

    for (let i = 0; i < productIds.length; i++) {
        const product = await ProductService.getProductById(productIds[i]);
        const newRate = (product.numReviews * product.rate + ratings[i]) / (product.numReviews + 1);

        await Product.updateOne(
            { productId: productIds[i] },
            {
                $set: { rate: newRate },
                $inc: { numReviews: 1 },
            },
            { new: true },
        );
    }

    return result;
};

module.exports = {
    getAllOrders,
    updateOrderStatus,
    shipOrders,
    updateProductRating,
};
