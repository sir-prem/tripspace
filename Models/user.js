const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: String,
    password: String,
    givenname: String,
    lastname: String,
    age: Number,
    gender: String,
    usertype: String,
    profile_pic: String
});

const User = mongoose.model('user', UserSchema);
module.exports = User;