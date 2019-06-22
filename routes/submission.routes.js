const submissionController = require('../controllers/submision.controller');

const express = require('express');
var router = express.Router();

router.route('/').post(function (req, res) {
    submissionController.insert(req.body).then(function (data) {
        res.status(data.status).send({
            message: data.message
        });
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/').get(function (req, res) {
    submissionController.get().then(function (data) {
        res.status(data.status).send(data.data
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

router.route('/:id').delete(function (req, res) {
    submissionController.deleteOne(req.params.id).then(function (data) {
        res.status(data.status).send(
            {
                data: data.message
            }
        );
    }).catch(error => {
        res.status(error.status).send({
            message: error.message
        })
    })
});

module.exports = router;
