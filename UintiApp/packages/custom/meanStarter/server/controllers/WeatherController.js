'use strict';

var restify = require('restify');
var config = require('../config/config.json');

exports.getWeather = function(location, callback) {
  var client = restify.createStringClient({
    url: 'http://data.fmi.fi'
  });

  client.get('/fmi-apikey/'+config.fmiKey+'/wfs?request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&parameters=temperature&place='+location, function(err, req, res, data) {
    callback(findWarmestHour(data));
  });
};

function findWarmestHour(data) {
  var xmldoc = require('xmldoc');

  var document = new xmldoc.XmlDocument(data);

  var temperatureResults = document.firstChild.firstChild.childNamed('om:result');

  var hourTemps = temperatureResults.firstChild;

  console.log(hourTemps);
}



