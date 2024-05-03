const CiamService = require('../services/ciamService');

const login = async (req, res) => {
    try {
        // let user = await CiamService.authenticateCustomer(req.body.email, req.body.password);

        // if (!user) {
        //     return res.status('401').json({
        //         error: "User not found or password doesn't match",
        //     });
        // }

        res.cookie('token', '12344', {
            expire: new Date() + 9999,
        });

        return res.json({
            user: { name: 'hello' },
        });
    } catch (err) {
        return res.status('401').json({
            error: 'Could not sign in',
        });
    }
};

module.exports = {
    login,
};
