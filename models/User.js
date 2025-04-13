const mongoose = require('mongoose');

const UserDetails = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requires: true,
    }
});

const UserList = mongoose.model("userdetail", UserDetails)

module.exports = UserList