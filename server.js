const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const routes = express.Router();

//classes which handles routes
var adminRouter = require('./admin/admin.controller');
var instructorRouter = require('./instructor/instructor.controller');
var courseRouter = require('./course/courseController');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//open up a connection to the database
mongoose.connect('mongodb://localhost/infosysdb',{useNewUrlParser:true});

var connection = mongoose.connection;
connection.once('open', function(){
    console.log("Connection Established");
}); 

//route the requests to the specified class
routes.use('/admin', adminRouter);
routes.use('/instructor', instructorRouter);
routes.use('/course', courseRouter);

app.use('/', routes);

app.listen(PORT, function(){
    console.log("Server running on port: "+PORT);
})