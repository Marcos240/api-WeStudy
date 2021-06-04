const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const User = new Schema({
    name: String,
    avatar: String, 
    email: String,
    username: String,
    school: String,
    password: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);