const CoachModel = require('../models/CoachSchema');
const Competition = require('../models/CompetitionSchema');

const getAllCoach = async () => {
    const Coach = await CoachModel.find({});

    return Coach;
};

const getCoachByID = async (req) => {
    const coachId = req.params.coachId;
    const Coach = await CoachModel.findOne({ coachId });

    return Coach;
};

const updateCoach = async (req, data) => {
    const coachId = req.params.coachId;
    console.log('coachid', coachId);

    const updatedCoach = await CoachModel.findOneAndUpdate({ coachId }, data, { new: true });
    console.log('updatesuccessfully');
    return updatedCoach;
};

const updateRating = async (req, data) => {
    const coachId = req.params.coachId;

    const oldCoach = await CoachModel.findOne({ coachId });

    const oldRating = oldCoach.rating;

    const newRating = data.rating;

    const totalRating = oldRating + newRating;
    const newNumOfRating = oldCoach.numOfRating + 1;
    const averageRating = totalRating / newNumOfRating;

    // Update the coach with the new average rating and increment the number of ratings
    const updatedCoach = await CoachModel.findOneAndUpdate(
        { coachId },
        { rating: averageRating, numOfRating: newNumOfRating },
        { new: true },
    );

    return updatedCoach;
};

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
    getAllCoach,
    getCoachByID,
    updateCoach,
    updateRating,
};
