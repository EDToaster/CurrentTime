/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

const axios = require("axios");
/**********************
 * Example get method *
 **********************/

app.get('/time/:lat/:lng', (req, res) => {
  // Add your code here
  const { lat, lng } = req.params;
  const url = `https://api.sunrise-sunset.org/json?`;
  axios.get(url, {
    params: {
      lat, lng, formatted: 0, date: "-1 days"
    }
  }).then((result) => {
    const { results } = result.data;
    const { sunrise, sunset } = results;
    const sunriseDate = new Date(sunrise), sunsetDate = new Date(sunset);
    const nowDate = new Date();

    // assuming sunrise = 0 deg, sunset = 180 deg
    const degreesPerMillisecond = 180.0 / (sunsetDate - sunriseDate);
    const angle = (nowDate - sunriseDate) * degreesPerMillisecond;

    const now = nowDate.toISOString();

    return res.status(200).json({ sunrise, sunset, now, angle, degreesPerMillisecond } );
  }).catch((err) => {
    return res.status(500).json({ err });
  });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
