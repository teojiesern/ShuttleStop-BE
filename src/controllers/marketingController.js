const MarketingService = require('../services/marketingService');

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

module.exports = {
    getCompetitions,
    addCompetition,
};
