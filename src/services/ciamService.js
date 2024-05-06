const CustomerModel = require('../models/CustomerSchema');

const findCustomer = async (email) => {
    const Customer = await CustomerModel.findOne({ email });

    return Customer;
};

const authenticateCustomer = async (customer, password) => {
    return customer.authenticate(password);
};

module.exports = {
    findCustomer,
    authenticateCustomer,
};
