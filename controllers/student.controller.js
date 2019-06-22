const express = require("express");

let StudentModel = require('../models/student.model');

var studentController = function () {
    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var student = new StudentModel({
                email: data.email,
                lastName: data.lastName,
                firstName: data.firstName,
                password: data.password,
                studentID: data.studentID,

            });

            student
                .save()
                .then(() => {
                    resolve({
                        status: 200,
                        message: "Added a assignmentExam successfully"
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
            StudentModel.find()
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
          AssignmentExamSchema.remove({
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

    this.update = (studentID, data) => {
        var email = JSON.stringify(data.email);
        var lastName = JSON.stringify(data.lastName);
        var firstName = JSON.stringify(data.firstName);
        var password = JSON.stringify(data.password);
        var studentID = JSON.stringify(data.studentID);

        return new Promise(function (resolve, reject) {
            StudentModel.find({
                email: email
            })
                .exec()
                .then(student => {
                    if (!student) {
                        student.email = email;
                        student.lastName = lastName;
                        student.firstName = firstName;
                        student.password = password;
                        student.studentID = studentID;

                        assignmentExam
                            .save()
                            .then(data =>
                                resolve({
                                    status: 200,
                                    data: data
                                })
                            )
                            .catch(err =>
                                reject({
                                    status: 500,
                                    message: "Error : " + err
                                })
                            );
                    }
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


module.exports = new studentController();
