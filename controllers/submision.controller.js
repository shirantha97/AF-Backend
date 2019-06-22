const express = require("express");
let SubmissionModel = require('../models/submissions.model');

var submissionController = function () {

    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var submission = new SubmissionModel({
                StudentID: data.StudentID,
                Date: data.Date,
            });

            submission
                .save()
                .then(() => {
                    resolve({
                        status: 200,
                        message: "Added a submission successfully"
                    });
                })
                .catch(err => {
                    reject({
                        status: 500,
                        message: "Error : " + err
                    });
                });
        }).catch(err => {
            return console.log(err);
        });
    };

    this.get = () => {
        return new Promise(function (resolve, reject) {
            SubmissionModel.find()
                .exec()
                .then(data => {
                    resolve({
                        status: 200,
                        data: data
                    });
                })
                .catch(err => {
                    reject({
                        status: 500,
                        message: "Error : " + err
                    });
                });
        });
    };

    this.deleteOne = id => {
        return new Promise(function(resolve, reject) {
            SubmissionModel.remove({
            _id: id
          })
            .exec()
            .then(data => {
              resolve({
                status: 200,
                message: "Deleted"
              });
            })
            .catch(err => {
              reject({
                status: 500,
                message: "Error : " + err
              });
            });
        });
      };

};

module.exports = new submissionController();
