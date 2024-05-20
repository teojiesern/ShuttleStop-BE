const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CompetitionSchema = new mongoose.Schema({
    compName: {
        type: String,
        required: 'Competition name is required',
        trim: true,
    },
    date: {
        type: String,
        required: 'Date is required',
    },
    state: {
        type: String,
        required: 'State is required',
        trim: true,
    },
    fee: {
        type: String,
        required: 'Fee is required',
        min: 0,
    },
    deadline: {
        type: String,
        required: 'Deadline is required',
    },
    prize: {
        type: String,
        required: 'Prize is required',
        trim: true,
    },
    url: {
        type: String,
        required: 'Registration link is required',
        trim: true,
        match: [/^https?:\/\/.+/, 'Please fill a valid URL'],
    },
});

const Competition = mongoose.model('Competition', CompetitionSchema);
module.exports = Competition;
