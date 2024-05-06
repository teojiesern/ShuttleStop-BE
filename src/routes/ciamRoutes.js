const express = require('express');
const router = express.Router();
const ciamController = require('../controllers/ciamController');

router.route('/login').post(ciamController.login);

module.exports = router;
