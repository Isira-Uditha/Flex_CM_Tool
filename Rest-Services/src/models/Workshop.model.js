const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    pdf_url: { type: String, required: true, trim: true },
    conductor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    status: { type: String, required: true, trim: true },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const WorkshopModel = mongoose.model('workshops', WorkshopSchema);
module.exports = WorkshopModel;