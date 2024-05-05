const customerService = require('../services/customerService');

exports.getCustomer = async (req, res) => {
    try {
        const examples = await customerService.getCustomer(req.cookies['shuttle-token']);
        res.json(examples);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
