const customerService = require('../services/customerService');

exports.getCustomerStatus = async (req, res) => {
    try {
        const examples = await customerService.getCustomerStatus();
        res.json(examples);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createExample = async (req, res) => {
    try {
        const { name } = req.body;
        const newExample = await customerService.createExample(name);
        res.json(newExample);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
