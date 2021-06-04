const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema(
    {
        name: { type: String, required: true },
        organization: { type: String , required: true},
        subjectExam: { type: String , required: true},
        source: { type: String, required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Exam', Exam);
