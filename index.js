// Packages
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
// End of Packages

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Get the root index.html file
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

// Get the variables form the converter form
app.post("/",function(req,res){
    var crypto = req.body.crypto; //Example output BTC
    var currency = req.body.currency; //Example output USD

    // Start of API Request for crypto conversion
    var baseUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';

    request(baseUrl + crypto + currency, function (error, response, body){
        data = JSON.parse(body);
        hour = data.changes.price.week;
        res.send('<h1>' + hour + '</h1>');


    });




});

// Start the server
app.listen(3000, function(){
   console.log('The server is working on port 3000');
});