// Packages
const express = require('express');
const bodyParser = require('body-parser');
// End of Packages

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Get the root index.html file
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

// Get the variables form the converter form
app.post("/",function(req,res){
    var crypto = req.body.crypto;
    var currency = req.body.currency;
    res.send('You have choosen ' + crypto + ' to be converted in ' + currency);
    console.log(crypto);
});

// Start the server
app.listen(3000, function(){
   console.log('The server is working on port 3000');
});