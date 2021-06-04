const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Câu hỏi của đề thi thử
const Question = new Schema(
    {
        name: { type: String , required: true},
        content: { type: String , required: true},
        answer: { type: String, required: true },   
        owner: { type: Schema.Types.ObjectId, ref: 'TestExam' }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Question', Question);
