const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const commentsSchema = new mongoose.Schema({
    description: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
}, {timestamps: true});

module.exports=mongoose.model('Comment', commentsSchema);
