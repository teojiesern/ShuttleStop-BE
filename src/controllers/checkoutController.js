const checkoutService = require('../services/checkoutService');

const createOrder = async (req, res) => {
    try {
        const customerId = req.cookies['shuttle-token'];

        const { groupedProduct, shippingOption, selectedPaymentMethod } = req.body;

        const order = await checkoutService.createOrder(
            customerId,
            groupedProduct,
            shippingOption,
            selectedPaymentMethod,
        );

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error' });
        console.error(error);
    }
};

module.exports = {
    createOrder,
};
