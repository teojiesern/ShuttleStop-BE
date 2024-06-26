const customerService = require('../services/customerService');
const productService = require('../services/productService');
const Customer = require('../models/CustomerSchema');
const OrderService = require('../services/orderService');

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
        if (err.code === 11000 || err.code === 11001) {
            return res.status(400).json({
                type: 'duplicate-email',
                message: 'The email address you have entered is already associated with another account.',
            });
        } else {
            return res.status(500).json({
                type: 'unable-to-create-user',
                message: err.message,
            });
        }
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customerId = req.cookies['shuttle-token'];
        const customer = await customerService.getCustomerById(customerId);

        if (!customer) {
            return res.status(404).json({
                type: 'user-not-found',
            });
        }
        if (req.file) {
            req.body.profileImgPath = req.file.path;
        }

        if (typeof req.body.address === 'string') {
            req.body.address = JSON.parse(req.body.address);
        }

        const updatedCustomer = await customerService.updateCustomer(customerId, req.body);

        res.json(updatedCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShop = async (req, res) => {
    try {
        const shop = await customerService.getShopByProductId(req.params.productId);
        if (!shop) {
            return res.status(404).json({
                type: 'shop-not-found',
            });
        }

        res.json(shop);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error' });
    }
};

const getToShipPurchases = async (req, res) => {
    try {
        const customerId = req.cookies['shuttle-token'];
        const purchases = await customerService.getToShipPurchases(customerId);
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getShippingPurchases = async (req, res) => {
    try {
        const customerId = req.cookies['shuttle-token'];
        const purchases = await customerService.getShippingPurchases(customerId);
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCompletedPurchases = async (req, res) => {
    try {
        const customerId = req.cookies['shuttle-token'];
        const purchases = await customerService.getCompletedPurchases(customerId);
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const completeOrder = async (req, res) => {
    try {
        const { trackingNumbers, newStatus } = req.body;
        const result = await OrderService.completeOrder(trackingNumbers);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

const updateProductRating = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { productIds, ratings } = req.body;
        const result = await OrderService.updateProductRating(orderId, productIds, ratings);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { newPassword, email } = req.body;
        const customer = await customerService.getCustomerByEmail(email);
        await customer.changePassword(newPassword);

        res.status(200).send('Password changed successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = {
    getCustomer,
    createCustomer,
    updateCustomer,
    getAllProducts,
    getProductById,
    getShop,
    getToShipPurchases,
    getShippingPurchases,
    getCompletedPurchases,
    completeOrder,
    updateProductRating,
    changePassword,
};
