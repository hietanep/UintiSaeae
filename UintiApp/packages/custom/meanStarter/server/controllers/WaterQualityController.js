'use strict';

var restify = require('restify');

exports.getWaterQuality = function(location, limit, callback) {
  var qualityWaters = getCleanWaters(location);
  var warmWaters = getWarmWaters(location, limit);

  return callback(qualityWaters);
};

function getCleanWaters(location) {
  var cleanWaters = {};

  var client = restify.createStringClient({
    url: 'http://rajapinnat.ymparisto.fi/api/kasviplanktonrajapinta/1.0/odata'
  });

  client.get('/AlgaBloomObservation?$top=20&$filter=Municipal%20eq' + location + 'and%20AlgaBloomIntensity/AlgaBloomIntensity_Id%20eq%200', function(err, req, res, data) {
    if(err)
      console.log(err);

    cleanWaters = data;

    return cleanWaters;
  });
}

function getWarmWaters(location, limit) {
  var warmWaters = {};

  var client = restify.createStringClient({
    url: 'http://rajapinnat.ymparisto.fi/api/vesla/2.0/odata'
  });

  client.get('/Result_Wide?$top=100&$filter=AnalyteCode%20eq%20%27TEMP%27%20and%20Site_Wide/Municipal%20eq%20%27' + location + '%27%20and%20Value%20gt%20' + limit, function(err, req, res, data) {
    warmWaters = data;

    return warmWaters;
  });
}
