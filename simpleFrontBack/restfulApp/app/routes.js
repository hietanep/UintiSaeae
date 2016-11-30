/**
 * Created by HIEPA on 23.11.2016.
 */

var restify = require('restify');
var config = require('./config.json');

function getJSONDataFromUrl(place){
    var client = restify.createStringClient({
        url: 'http://data.fmi.fi'
    });


    client.get('/fmi-apikey/'+config.fmiKey+'/wfs?request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&parameters=temperature&place='+place, function(error, request, response, data) {
        //assert.ifError(err);
        console.log('%s', data);
        return data;
        //return res.send(data);
    });
}



module.exports = function (app) {
    app.get("/", function (req, res, next) {
        return res.send("welcome to REST API");
    });

    app.get("/hello/:name", function (req, res, next) {
        return res.send("hello " + req.params.name);
    });

    app.get("/movie/:title", function (req, res, next) {

        var seach = req.params.title;

        var query = "?s="+seach;
        var options = {};
        options.url = "http://www.omdbapi.com";
        options.type = options.type || "json";
        options.path = "/" + query;
        options.headers = {Accept: "application/json"};

        tulos ="";
        var client = restify.createClient(options);

        client.get(options, function(error, request, response, data) {
            if (error) {
                console.log(error);
                return;
            }
            client.close();

            return res.send("Tulos:" + JSON.stringify(data));
        });

    });


    app.get("/fmi/:location", function (req, res, next) {

        var location = req.params.location;

        var client = restify.createStringClient({
            url: 'http://data.fmi.fi'
        });

        client.get('/fmi-apikey/'+config.fmiKey+'/wfs?request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&parameters=temperature&place='+location, function(error, request, response, data) {
            //assert.ifError(err);
            console.log('%s', data);
            return res.send(data);
        });

        client.close();

        //return res.send(getJSONDataFromUrl(location));

    });
};