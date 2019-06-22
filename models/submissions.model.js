const mongoose = require('mongoose');

let SubmissionModel = new mongoose.Schema({
    StudentID: {
        type: String,
        required: true
    },
    
    Date: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Submission', SubmissionModel);
