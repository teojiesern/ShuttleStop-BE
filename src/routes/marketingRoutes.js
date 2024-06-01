const express = require('express');
const router = express.Router();
const marketingController = require('../controllers/marketingController');
const ciamController = require('../controllers/ciamController');
const { uploadSingle } = require('../middleware/fileMiddleware');

router.route('/coaches').get(marketingController.getAllCoachDetails);
router.route('/coach-registration').post(uploadSingle, marketingController.registerCoach);
router.route('/coach-edit/:coachId').post(uploadSingle, marketingController.updateCoach);
router.route('/coach-profile/:coachId').get(marketingController.getCoachDetails);
router.route('/coach-rating/:coachId').post(marketingController.updateRating);

router.get('/competitions', marketingController.getCompetitions);
router.post('/competitions', marketingController.addCompetition);

module.exports = router;
