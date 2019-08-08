// Packages
const express = require('express');
const bodyParser = require('body-parser');
//

var app = express();

// Get the root index.html file
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
    console.log('__dirname');
});



app.listen(3000, function(){
   console.log('The server is working on port 3000');
});