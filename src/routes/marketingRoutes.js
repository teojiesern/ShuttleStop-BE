const express = require('express');
const router = express.Router();
const marketingController = require('../controllers/marketingController');

router.get('/competitions', marketingController.getCompetitions);
router.post('/competitions', marketingController.addCompetition);

module.exports = router;
