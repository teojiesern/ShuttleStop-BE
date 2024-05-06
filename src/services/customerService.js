const CustomerModel = require('../models/CustomerSchema');

const getCustomerById = async (customerId) => {
    const Customer = await CustomerModel.findOne({ customerId });

    return Customer;
};

const getCustomerByEmail = async (email) => {
    const Customer = await CustomerModel.findOne({ email });

    return Customer;
};

module.exports = {
    getCustomerById,
    getCustomerByEmail,
};
