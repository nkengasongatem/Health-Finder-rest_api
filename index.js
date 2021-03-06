const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/healthfinder');
mongoose.Promise = global.Promise;

// frontend
app.use(express.static('front-end'));

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    // respond with error and status code
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, ()=>{
    console.log("Now listening for requests");
});