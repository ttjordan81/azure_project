const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const isStudent = require('./middleware/isStudent');
//const bodyParser = require('body-parser');
// Route Imports
const getSurvey = require('./getSurvey');
const postSurvey = require('./postSurvey');

const app = express();

// Handles the CORS headers
const corsOptions ={
    origin:'http://lively-meadow-0c02fb810.2.azurestaticapps.net:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200 
}
app.use(cors(corsOptions));

app.options('*', cors()); // enable pre-flight

// Handles the SPA browser history
//app.use(history());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Parse incoming requests with JSON payloads - limit files to 50mb
app.use(express.json({ limit: '50mb' }));

app.use(isStudent);

/*  app.use('/api/post-survey',(req, res, next) => {
    console.log(res)
    return res.json({"test":123})
});
 */

app.use('/api/get-survey', getSurvey);
app.use('/api/post-survey', postSurvey);


// Catch all request
app.use((req, res, next) => {
    res.status(404).send('service not found');
});

const PORT = process.env.PORT || 80; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
