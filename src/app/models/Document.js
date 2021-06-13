const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Phiếu tài liệu
const Document = new Schema(
    {
        name: { type: String, required: true },
        subject: { type: String , required: true},
        source: { type: String, required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Document', Document);
