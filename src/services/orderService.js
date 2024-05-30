const Order = require('../models/OrderSchema');

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

module.exports = {
    getAllOrders,
    updateOrderStatus,
};
