// Packages

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejs = require('ejs');
// End of Packages

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// Connect with the static files directory
app.use('/static',express.static(__dirname + "/static"));

// General variables
var convertionResult = 0;
var currentCurrency = "";


// Get the root index.html file
app.get('/', (req, res) => {
    res.render('index', {conversionResult: convertionResult,currentCurrency: currentCurrency});
});



// Get the variables form the converter form
app.post("/",function(req,res) {
    var crypto = req.body.crypto; //Example output BTC
    var currency = req.body.currency; //Example output USD
    var amount = req.body.amount;

    var options = {
        url: 'https://apiv2.bitcoinaverage.com/convert/global',
        method: 'GET',
        qs: {
            from: crypto,
            to: currency,
            amount: amount,
        }
    };

    request(options, function (error, respond, body) {
        var data = JSON.parse(body);
        var time = data.time;
        var price = data.price;

        var convertionResult = Math.round(price);
        var currentCurrency = currency;
        res.render('index', {conversionResult: convertionResult,currentCurrency: currentCurrency});
    });

});



// Start the server
app.listen(3000, function(){
   console.log('The server is working on port 3000');
});