const mongoose = require('mongoose');

const ConferenceSchema = new mongoose.Schema({
    // code: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    description: { type: String,trim: true },
    date: { type: String },
    time: { type: String },
    location: { type: String,  trim: true },
    speakers: [{speaker: {type: String,trim: true}, url: {type: String,trim: true}}],
    ticket_price: { type: Number },
    g_speaker: { type: String, trim: true },
    g_url: { type: String, trim: true },
    tracks: { type: String, trim: true },
    status: { type: String, trim: true },
});

const ConferenceModel = mongoose.model('conferences', ConferenceSchema);
module.exports = ConferenceModel;