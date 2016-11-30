/**
 * Created by HIEPA on 23.11.2016.
 */

var restify = require('restify');
var config = require('./config.json');
var app = restify.createServer({name: "restfulApp"});

app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());

app.listen(config.port, function () {
    console.log("palvelin kuuntelee porttia: ", config.port);
});

var routes = require('./routes')(app);
