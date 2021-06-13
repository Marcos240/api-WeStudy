const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Người dùng
const User = new Schema({
    name: String,
    avatar: String, 
    email: String,
    username: String,
    school: String,
    password: String,
    testRegisters: [{ type: Schema.Types.ObjectId, ref: 'TestRegister' }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);