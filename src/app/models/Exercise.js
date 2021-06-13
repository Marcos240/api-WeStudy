const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Phiếu bài tập trắc nghiệm
const Exercise = new Schema(
    {
        subjectExercise: { type: String , required: true},
        chapter: { type: String , required: true},
        source: { type: String, required: true },      
        questions: [{ type: Schema.Types.ObjectId, ref: 'QuestionExercise' }]
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Exercise', Exercise);
