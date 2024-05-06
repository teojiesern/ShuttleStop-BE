const customerService = require('../services/customerService');
const Customer = require('../models/CustomerSchema');
const errorHandler = require('../handlers/dbErrorHandlers');

const getCustomer = async (req, res) => {
    try {
        const examples = await customerService.getCustomer(req.cookies['shuttle-token']);
        res.json(examples);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error' });
    }
};

const createCustomer = async (req, res) => {
    // name, email, password
    const customer = new Customer(req.body);
    try {
        await customer.save();
        return res.status(200).json({
            message: 'Successfully signed up!',
        });
    } catch (err) {
        return res.status(500).json({
            type: 'unable-to-create-user',
        });
    }
};

module.exports = {
    getCustomer,
    createCustomer,
};
