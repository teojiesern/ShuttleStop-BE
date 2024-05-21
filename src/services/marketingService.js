const Competition = require('../models/CompetitionSchema');

// Service function to get all competitions
const getAllCompetitions = async () => {
    return await Competition.find();
};

// Service function to create a new competition
const createCompetition = async (competitionData) => {
    return await Competition.create(competitionData);
};

module.exports = {
    getAllCompetitions,
    createCompetition,
};
