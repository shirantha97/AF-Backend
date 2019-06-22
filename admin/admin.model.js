const mongoose = require('mongoose');

let AdminModel = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Admin', AdminModel);