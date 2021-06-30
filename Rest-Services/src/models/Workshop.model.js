const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    notes: { type: String, required: false, trim: true },
    conductor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    conference_id: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'conferences'},
    status: { type: String, required: true, trim: true },
    notify: { type: String, trim: true },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const WorkshopModel = mongoose.model('workshops', WorkshopSchema);
module.exports = WorkshopModel;