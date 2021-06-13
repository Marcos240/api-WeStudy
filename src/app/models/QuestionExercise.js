const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Câu hỏi của đề thi thử
const QuestionExercise = new Schema(
    {
        name: { type: String , required: true},
        content: { type: String , required: true},
        answer: { type: String, required: true },   
        owner: { type: Schema.Types.ObjectId, ref: 'Exercise' }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('QuestionExercise', QuestionExercise);
