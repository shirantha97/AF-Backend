const mongoose = require('mongoose');

let CourseModel = new mongoose.Schema({
    code : {
        type: String,
        required: true
    },
    courseName : {
        type: String,
        required: true
    },
    modules : [{
        type: String,
        required: true
    }],
    instructors : [{
        type: String,
        required: true
    }],
});

module.exports = mongoose.model('Course', CourseModel);
