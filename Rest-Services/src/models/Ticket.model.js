const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    conference_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'conferences' },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    price: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const TicketModel = mongoose.model('tickets', TicketSchema);
module.exports = TicketModel;