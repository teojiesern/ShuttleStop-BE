const CustomerModel = require('../models/CustomerSchema');

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

module.exports = {
    getCustomerById,
    getCustomerByEmail,
    updateCustomer,
};
