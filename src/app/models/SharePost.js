const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Bài chia sẻ
const SharePost = new Schema(
    {
        name: { type: String, required: true },
        source: { type: String, required: true },
        img : { type: String, required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('SharePost', SharePost);
