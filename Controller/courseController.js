const express = require('express');
const courseRoutes = express.Router();
const nodemailer = require('nodemailer');

let Course = require('../Model/course.model');

//create new course
courseRoutes.route('/create').post(function(req, res){
    let course = new Course(req.body);

    let code = req.body.code;

    //query the db for the same code
    Course.find({code: code}, (err, courses)=>{
        if(err){
            return res.send({message : 'Error'});
        }
        if(courses.length >= 1){
            return res.send({message: 'Course code exists'});
        }
        else{
            course.save().
            then(course => {
                res.status(200).json({'Course' : 'Added Successfully'});
            })
            .catch(err => {
                res.status(400).send('Could not add the course');
            });

        const output = `
        <p>Hi All, </p>
        <p>You have been added to the new course.Please accept the course to proceed.</p>
        <ul>  
            <li>Course code: ${req.body.code}</li>
            <li>Course Name: ${req.body.courseName}</li>
            <li>Modules: ${req.body.modules}</li>
        </ul>
        <p>Thank you</p>
        `;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({

            service: 'gmail',
            secure: false, 
            auth: {
                user: 'siisystem1@gmail.com', 
                pass: 'siisystem74.'
            },
            tls:{
            rejectUnauthorized:false
            }
        });

        // setup email data
        let mailOptions = {
            from: '"SII System" <siisystem1@gmail.com>',
            to: req.body.instructors,
            subject: 'New Courese Added',
            text: 'text', 
            html: output 
        };

        // send mail 
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.status(200).json({'Instructor' : 'Course Added and mails sent Successfully'});
        });
        }//end of else
    });
});


//view instructor details
courseRoutes.route('/').get(function(req, res){
    Course.find(function(err,course){
        if(err){
            console.log(err);
        }else{
            res.json(course);
        }
    });
});

//delete course details
courseRoutes.route('/:code').delete(function(req, res){
    let id = req.params.code;
    Course.remove({code:id}).exec()
        .then(instructor => { 
            res.status(200).json({'Course' : 'Deleted Successfully'});
        })
        .catch(err => {
            res.status(400).send('Deletion failed');
        });
});

module.exports = courseRoutes;