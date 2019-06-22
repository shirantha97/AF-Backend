const express = require("express");
const instructorRoutes = express.Router();
const nodemailer = require("nodemailer");

let Instructor = require("../models/instructor.model");

//create new instructor
instructorRoutes.route("/create").post(function(req, res) {
  let instructor = new Instructor(req.body);

  let email = req.body.email;

  //query the db for the same username
  Instructor.find({ email: email }, (err, instructors) => {
    if (err) {
      return res.send({ message: "Error" });
    }
    if (instructors.length >= 1) {
      return res.send({ message: "Email address exists" });
    } else {
      instructor
        .save()
        .then(instructor => {
          res.status(200).json({ Instructor: "Added Successfully" });
        })
        .catch(err => {
          res.status(400).send("Adding failed");
        });

      const output = `
        <p>Hi ${req.body.firstName}, </p>
        <p>Your account has been created</p>
        <ul>  
            <li>First Name: ${req.body.firstName}</li>
            <li>Last Name: ${req.body.lastName}</li>
            <li>Email Address: ${req.body.email}</li>
        </ul>
        <p>Welcome to the team!</p>
        `;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
          user: "siisystem1@gmail.com",
          pass: "siisystem74."
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // setup email data
      let mailOptions = {
        from: '"SII System" <siisystem1@gmail.com>',
        to: req.body.email,
        subject: "Welcome to SII",
        text: "text",
        html: output
      };

      // send mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res
          .status(200)
          .json({ Instructor: "Added and sent mail Successfully" });
      });
    } //end of else
  });
});

//view instructor details
instructorRoutes.route("/").get(function(req, res) {
  Instructor.find(function(err, instructor) {
    if (err) {
      console.log(err);
    } else {
      res.json(instructor);
    }
  });
});

//get instructor details by id
instructorRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Instructor.findById(id, function(err, instructor) {
    res.json(instructor);
  });
});

//delete instructor details
instructorRoutes.route("/:email").delete(function(req, res) {
  let id = req.params.email;
  Instructor.remove({ email: id })
    .exec()
    .then(instructor => {
      res.status(200).json({ Course: "Deleted Successfully" });
    })
    .catch(err => {
      res.status(400).send("Deletion failed");
    });
});

module.exports = instructorRoutes;
