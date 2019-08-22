// Packages
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
// End of Packages

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Connect with the static files
app.use('/static',express.static(__dirname + "/static"));
// Get the root index.html file
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
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
        var priceWithDecimal = Math.round(price);
        console.log(data);
        res.send('The conversion rate is ' + price + ' ' + currency + ' ' + time);
    })
});

// Start the server

app.listen(3000, function(){
   console.log('The server is working on port 3000');
});