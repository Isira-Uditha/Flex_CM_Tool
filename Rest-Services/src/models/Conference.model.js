const mongoose = require('mongoose');

const ConferenceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true,trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true,  trim: true },
    speakers: [{index:{type: Number,trim: true}, speaker: {type: String,trim: true}, url: {type: String,trim: true}}],
    ticket_price: { type: Number, required: true },
    g_speaker: { type: String, trim: true },
    g_url: { type: String, trim: true },
    tracks: { type: String, trim: true },
    status: { type: String, trim: true },
    post_status: { type: String, trim: true },
    notify: { type: String, trim: true },
});

const ConferenceModel = mongoose.model('conferences', ConferenceSchema);
module.exports = ConferenceModel;