'use strict';

var restify = require('restify');
var config = require('../config/config.json');

exports.getWeather = function(location, callback) {
  var weather = {};

  var client = restify.createStringClient({
    url: 'http://data.fmi.fi'
  });

  client.get('/fmi-apikey/'+config.fmiKey+'/wfs?request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&parameters=temperature&place='+location, function(err, req, res, data) {
    weather = data;

    return weather;
  });
};



