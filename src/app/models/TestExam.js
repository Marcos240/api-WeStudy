const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Đề thi thử
const TestExam = new Schema(
    {
        subjectExam: { type: String , required: true},
        testCode: { type: String , required: true},
        source: { type: String, required: true },
        testTime: { type: String , required: true},
        description: { type: String, required: true },        
        questions: [{ type: Schema.Types.ObjectId, ref: 'QuestionTestExam' }]
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('TestExam', TestExam);
