const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/status', customerController.getCustomerStatus);
router.get('/create', customerController.createExample);

module.exports = router;
