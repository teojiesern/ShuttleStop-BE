const express = require('express');
const router = express.Router();
const ciamController = require('../controllers/ciamController');

router.post('/login', ciamController.login);

module.exports = router;
