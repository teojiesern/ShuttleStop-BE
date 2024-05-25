const MarketingService = require('../services/marketingService');
const marketingService = require('../services/marketingService');

const Coach = require('../models/CoachSchema');

// Controller function to get competitions
const getCompetitions = async (req, res) => {
    try {
        const competitions = await MarketingService.getAllCompetitions();
        return res.json(competitions);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to add a new competition
const addCompetition = async (req, res) => {
    try {
        const newCompetition = req.body;
        const createdCompetition = await MarketingService.createCompetition(newCompetition);
        return res.status(201).json(createdCompetition);
    } catch (error) {
        return res.status(500).json({ error });
    }
};
const getAllCoachDetails = async (req, res) => {
    try {
        const coach = await marketingService.getAllCoach();

        if (!coach) {
            return res.status(404).json({
                type: 'coach-not-found',
            });
        }

        res.json(coach);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error' });
    }
};

const getCoachDetails = async (req, res) => {
    try {
        const coach = await marketingService.getCoachByID(req);

        if (!coach) {
            return res.status(404).json({
                type: 'coach-not-found',
            });
        }

        res.json(coach);
    } catch (error) {
        res.status(500).json({ type: 'internal-server-error' });
    }
};

const registerCoach = async (req, res) => {
    try {
        const coachData = req.body;

        if (req.file) {
            coachData.file = req.file.path;
        }
        const coach = new Coach(coachData);

        await coach.save();

        return res.status(200).json({
            message: 'Successfully registered new coach!',
            coach: coach,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            type: 'unable-to-register-coach',
            message: err.message,
        });
    }
};

const updateRating = async (req, res) => {
    try {
        const coach = await marketingService.getCoachByID(req);

        if (!coach) {
            return res.status(404).json({
                type: 'coach-not-found',
                message: 'Coach not found',
            });
        }

        const updatedCoach = await marketingService.updateRating(req, req.body);

        res.status(200).json({
            message: 'success',
            rating: updatedCoach.rating,
            numOfRating: updatedCoach.numOfRating,
        });

        console.log();
    } catch (error) {
        console.error(error);
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};
const updateCoach = async (req, res) => {
    try {
        const {
            coachName,
            level,
            targetAge,
            qualification,
            experience,
            archivement,
            timeslot,
            location,
            state,
            area,
            feePerSession,
            contact,
        } = req.body;

        const coach = await marketingService.getCoachByID(req);

        if (!coach) {
            return res.status(404).json({
                type: 'coach-not-found',
                message: 'Coach not found',
            });
        }

        coach.coachName = coachName;
        coach.level = level;
        coach.targetAge = targetAge;
        coach.qualification = qualification;
        coach.experience = experience;
        coach.archivement = archivement;
        coach.timeslot = timeslot;
        coach.location = location;
        coach.state = state;
        coach.area = area;
        coach.feePerSession = feePerSession;
        coach.contact = contact;

        if (req.file) {
            coach.file = req.file.path;
        }

        await coach.save();

        res.status(200).json({
            message: 'success',
            data: coach,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ type: 'internal-server-error', message: error.message });
    }
};

module.exports = {
    getAllCoachDetails,
    getCoachDetails,
    registerCoach,
    updateCoach,
    updateRating,
    getCompetitions,
    addCompetition,
};
