const Order = require('../models/OrderSchema');

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
};

module.exports = {
    getAllOrders,
};
