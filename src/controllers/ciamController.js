const CiamService = require('../services/ciamService');
const CustomerService = require('../services/customerService');

const login = async (req, res) => {
    try {
        const customer = await CustomerService.getCustomerByEmail(req.body.email);

        if (!customer) {
            return res.status(404).json({
                type: 'user-not-found',
            });
        }

        const passwordMatch = await CiamService.authenticateCustomer(customer, req.body.password);

        if (!passwordMatch) {
            return res.status(401).json({
                type: 'incorrect-password',
            });
        }

        // 1 day expiry
        res.cookie('shuttle-token', customer.customerId, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

        return res.json({
            customer,
        });
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error: 'Could not sign in',
        });
    }
};

const hasCookie = (req, res, next) => {
    if (!req.cookies || !req.cookies['shuttle-token']) {
        return res.status(401).json({
            error: 'User is not logged in',
        });
    }
    next();
};

module.exports = {
    login,
    hasCookie,
};
