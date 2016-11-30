var config = require('./config.json');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname +"/public"));
app.use(bodyParser.json());


app.listen(config.port, function () {
    console.log("palvelin kuuntelee porttia: ", config.port);
});