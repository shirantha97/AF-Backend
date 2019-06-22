const mongoose = require('mongoose');

let StudentModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', StudentModel);
