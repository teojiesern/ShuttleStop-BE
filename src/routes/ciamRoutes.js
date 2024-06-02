const express = require('express');
const router = express.Router();
const ciamController = require('../controllers/ciamController');

router.route('/login').post(ciamController.login);
router.route('/send-otp').post(ciamController.sendOTP);
router.route('/logout').post(ciamController.logout);

module.exports = router;
