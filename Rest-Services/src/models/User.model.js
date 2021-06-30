const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    contact: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    payment_status: { type: String, trim: true },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;