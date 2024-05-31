const CustomerModel = require('../models/CustomerSchema');
const ShopModel = require('../models/ShopSchema');
const OrderModel = require('../models/OrderSchema');

const getCustomerById = async (customerId) => {
    const Customer = await CustomerModel.findOne({ customerId });

    return Customer;
};

const getCustomerByEmail = async (email) => {
    const Customer = await CustomerModel.findOne({ email });

    return Customer;
};

const updateCustomer = async (customerId, data) => {
    const updatedCustomer = await CustomerModel.findOneAndUpdate({ customerId }, data, { new: true });
    return updatedCustomer;
};

const getShopByProductId = async (productId) => {
    const Shop = await ShopModel.findOne({ products: productId });

    return Shop;
};

const getToShipPurchases = async (customerId) => {
    const purchases = await OrderModel.aggregate([
        { $match: { customer: customerId } },
        {
            $addFields: {
                products: {
                    $filter: {
                        input: '$products',
                        as: 'product',
                        cond: { $eq: ['$$product.status', 'To Ship'] },
                    },
                },
            },
        },
        { $match: { 'products.0': { $exists: true } } },
        { $sort: { created: -1 } },
    ]);
    return purchases;
};

const getShippingPurchases = async (customerId) => {
    const purchases = await OrderModel.aggregate([
        { $match: { customer: customerId } },
        {
            $addFields: {
                products: {
                    $filter: {
                        input: '$products',
                        as: 'product',
                        cond: { $eq: ['$$product.status', 'Shipping'] },
                    },
                },
            },
        },
        { $match: { 'products.0': { $exists: true } } },
        { $sort: { created: -1 } },
    ]);
    return purchases;
};

const getCompletedPurchases = async (customerId) => {
    const purchases = await OrderModel.aggregate([
        { $match: { customer: customerId } },
        {
            $addFields: {
                products: {
                    $filter: {
                        input: '$products',
                        as: 'product',
                        cond: { $eq: ['$$product.status', 'Completed'] },
                    },
                },
            },
        },
        { $match: { 'products.0': { $exists: true } } },
        { $sort: { created: -1 } },
    ]);
    return purchases;
};

module.exports = {
    getCustomerById,
    getCustomerByEmail,
    updateCustomer,
    getShopByProductId,
    getToShipPurchases,
    getShippingPurchases,
    getCompletedPurchases,
};
