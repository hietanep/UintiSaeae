'use strict';

var restify = require('restify');
var http = require('http');
var cleanWaters;
var warmWaters;

exports.getWaterQuality = function(location, limit, callback) {
  getCleanWaters(location, function(err, data) {
    cleanWaters = data;

    complete(callback);
  });

  getWarmWaters(location, limit, function(err, data) {
    warmWaters = data;

    complete(callback);
  });
};

function getCleanWaters(location, callback) {
  var cleanWaters = [];
  var serviceRoot = 'http://rajapinnat.ymparisto.fi/api/Kasviplanktonrajapinta/1.0/odata/';
  var query = 'AlgaBloomObservation?$top=20&$filter=Municipal%20eq%20%27' + location + '%27%20and%20AlgaBloomIntensity/AlgaBloomIntensity_Id%20eq%200';

  getURL(serviceRoot + query, function(err, body) {
    if(!err) {
      body.value.forEach(function (element) {
        cleanWaters.push(element.Site);
      });

      callback(null, cleanWaters);
    }
    else
      callback(err, null);
  });
}

function getWarmWaters(location, limit, callback) {
  var warmWaters = [];
  var serviceRoot = 'http://rajapinnat.ymparisto.fi/api/vesla/2.0/odata/';
  var query = 'Result_Wide?$top=100&$filter=AnalyteCode%20eq%20%27TEMP%27%20and%20Site_Wide/Municipal%20eq%20%27' + location + '%27%20and%20Value%20gt%20' + limit;

  getURL(serviceRoot + query, function(err, body) {
    if(!err) {
      body.value.forEach(function (element) {
        warmWaters.push(element.Site);
      });

      callback(null, warmWaters);
    }
    else
      callback(err, null);
  });
}

function getURL(url, callback) {
  var body = '';
  http.get(url, function (response) {
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      body = JSON.parse(body);
      callback(null, body);
    });
  }).on('error', function (e) {
    console.log('ERROR: ' + e.message);
    callback(e, null);
  });
}

function combineData() {
  var combinedData = {};

  // combined = warm + clean

  return combinedData;
}

function complete(callback) {
  var combinedData = {};
  if(warmWaters != null && cleanWaters != null) {
    combinedData = combineData();

    callback(combinedData);
  }
}
