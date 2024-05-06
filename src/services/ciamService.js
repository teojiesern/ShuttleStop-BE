const authenticateCustomer = async (customer, password) => {
    return customer.authenticate(password);
};

module.exports = {
    authenticateCustomer,
};
