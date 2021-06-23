const mongoose = require('mongoose');

const ConferenceSchema = new mongoose.Schema({
    code: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    speakers: [{ type: String, required: true, trim: true }],
    ticket_price: { type: Number, required: true, },
});

const ConferenceModel = mongoose.model('conferences', ConferenceSchema);
module.exports = ConferenceModel;