'use strict';
require('module-alias/register');
require('dotenv').config();
require('@config/setup');
const cron = require("node-cron");
require('@services/database')

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');


var app = express();


const PORT = process.env.PORT;

app.use(helmet());

app.use(morgan('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Client API's
const routes = require('@routes/router');
app.use('/api/', routes);

const controller = require('@clientControllers/twitter_api')
cron.schedule("*  */30 * * *", async () => {
    await controller.fetchTweets

});



// Catch 404
app.use((req, res, next) => {
    res.status(404).send({
        success: false,
        message: "Invalid Route"
    });
});



// Error handler
app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.status || 500);
    if (error.status != 500) {
        error = error.message;
    }
    res.send({
        success: false,
        message: error
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

