const express = require('express');
const adminRoutes = express.Router();

let Admin = require('../Model/admin.model');

//create new admin
adminRoutes.route('/create').post(function(req, res){
    let admin = new Admin(req.body);

    let username = req.body.username;

    Admin.find({username: username}, (err, admins)=>{
        if(err){
            return res.send({message : 'Error'});
        }
        if(admins.length >= 1){
            return res.send({message: 'Username exists'});
        }
        admin.save().
        then(admin => {
            res.status(200).json({'admin' : 'Added Successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding failed');
        });
    });
});


//view admin details
adminRoutes.route('/').get(function(req, res){
    Admin.find(function(err,admin){
        if(err){
            console.log(err);
        }else{
            res.json(admin);
        }
    });
});

//get admin details by id
adminRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Admin.findById(id, function(err,admin){
        res.json(admin);
    });
});

//delete user details
adminRoutes.route('/:username').delete(function(req, res){
    let id = req.params.username;
    Admin.remove({username:id}).exec()
        .then(admin => { 
            res.status(200).json({'Admin' : 'Deleted Successfully'});
        })
        .catch(err => {
            res.status(400).send('Deletion failed');
        });
});

module.exports = adminRoutes;