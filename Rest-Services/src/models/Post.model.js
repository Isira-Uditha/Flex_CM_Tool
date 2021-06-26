const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    type: { type: String, required: true },
    pdf_url: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostModel = mongoose.model('posts', PostSchema);
module.exports = PostModel;