const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Phiếu đăng ký thi thử
const TestRegister = new Schema(
    {
        subject: { type: String , required: true},
        testTime: { type: String , required: true},        
        testCode: { type: String , required: true},
        description: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('TestRegister', TestRegister);
