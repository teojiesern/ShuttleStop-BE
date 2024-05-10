const customerService = require('../services/customerService');
const Customer = require('../models/CustomerSchema');

const getCustomer = async (req, res) => {
    try {
        const customerId = req.cookies['shuttle-token'];
        const customer = await customerService.getCustomerById(customerId);

        if (!customer) {
            return res.status(404).json({
                type: 'user-not-found',
            });
        }

        res.json(customer);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error' });
    }
};

const createCustomer = async (req, res) => {
    const customer = new Customer(req.body);
    try {
        await customer.save();
        return res.status(200).json({
            message: 'Successfully signed up!',
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-create-user',
            message: err.message,
        });
    }
};

module.exports = {
    getCustomer,
    createCustomer,
};
