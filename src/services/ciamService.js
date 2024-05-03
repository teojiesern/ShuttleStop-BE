const CustomerModel = require('../models/CustomerSchema');

const authenticateCustomer = async (email, password) => {
    const Customer = await CustomerModel.findOne({ email });

    if (!Customer || !Customer.authenticate(password)) {
        return null;
    }

    return Customer;
};

module.exports = {
    authenticateCustomer,
};
