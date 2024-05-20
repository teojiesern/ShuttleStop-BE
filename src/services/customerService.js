const CustomerModel = require('../models/CustomerSchema');
const ShopModel = require('../models/ShopSchema');

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

module.exports = {
    getCustomerById,
    getCustomerByEmail,
    updateCustomer,
    getShopByProductId,
};
