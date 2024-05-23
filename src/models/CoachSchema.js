const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const CoachSchema = new mongoose.Schema({
    coachId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    coachName: {
        type: String,
        trim: true,
        required: 'Coach name is required',
    },
    level: {
        type: String,
        trim: true,
        required: 'Level is required',
    },
    targetAge: {
        type: String,
        required: 'Target age is required',
    },

    rating: {
        type: Number,
        default: 0,
    },
    numOfRating: {
        type: Number,
        default: 0,
    },
    qualification: {
        type: String,
        required: 'Qualification is required',
    },
    experience: {
        type: String,
        required: 'Experience is required',
    },
    archivement: {
        type: String,
        required: 'Archivement is required',
    },
    timeslot: {
        type: String,
        required: 'Time Slot is required',
    },
    location: {
        type: String,
        required: 'Location is required',
    },
    state: {
        type: String,
        required: 'State is required',
    },
    area: {
        type: String,
        required: 'Area is required',
    },

    feePerSession: {
        type: Number,
        required: 'Fee Per Session is required',
    },
    contact: {
        type: String,
        required: 'Contact is required',
    },
    file: {
        type: String,
        required: false,
    },
});

const Coach = mongoose.model('Coach', CoachSchema);
module.exports = Coach;
