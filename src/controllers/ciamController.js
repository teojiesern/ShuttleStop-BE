const CiamService = require('../services/ciamService');

const login = async (req, res) => {
    try {
        // let user = await CiamService.authenticateCustomer(req.body.email, req.body.password);

        // if (!user) {
        //     return res.status('401').json({
        //         error: "User not found or password doesn't match",
        //     });
        // }

        // 1 day expiry
        res.cookie('shuttle-token', '1', { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

        return res.json({
            user: { name: 'hello' },
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
