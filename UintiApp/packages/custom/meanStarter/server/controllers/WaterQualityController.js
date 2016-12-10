'use strict';

var restify = require('restify');
var http = require('http');
var cleanWaters;
var warmWaters;
var SEARCH_FROM_MONTHS = 2;

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

// get water bodies with no measured algae at any point in time
function getCleanWaters(location, callback) {
  var cleanWaters = [];
  var serviceRoot = 'http://rajapinnat.ymparisto.fi/api/Kasviplanktonrajapinta/1.0/odata/';
  var query = 'AlgaBloomObservation?$top=20&$filter=Municipal%20eq%20%27' + location + '%27%20and%20AlgaBloomIntensity/AlgaBloomIntensity_Id%20eq%200';

  getURL(serviceRoot + query, function(err, body) {
    if(!err) {
      if(body.value != null)
      {
        body.value.forEach(function (element) {
          cleanWaters.push(element.Site);
        });
      }
      else
        cleanWaters = [];

      callback(null, cleanWaters);
    }
    else
      callback(err, null);
  });
}

// get water bodies that have been measured warm enough in the last <SEARCH_FROM_MONTHS> months
function getWarmWaters(location, limit, callback) {
  var warmWaters = [];
  var serviceRoot = 'http://rajapinnat.ymparisto.fi/api/vesla/2.0/odata/';

  var startSearchDate = new Date();
  startSearchDate.setMonth(startSearchDate.getMonth() - SEARCH_FROM_MONTHS);

  var month = startSearchDate.getMonth();
  var year = startSearchDate.getFullYear();

  var query = 'Result_Wide?$top=100&$filter=AnalyteCode%20eq%20%27TEMP%27%20and%20Site_Wide/Municipal%20eq%20%27' + location + '%27%20and%20Value%20gt%20' + limit +
    '%20and%20year(Time)%20ge%20' + year + '%20and%20month(Time)%20ge%20' + month;

  getURL(serviceRoot + query, function(err, body) {
    if(!err) {
      if(body.value != null)
      {
        body.value.forEach(function (element) {
          warmWaters.push(element.Site);
        });
      }
      else
        warmWaters = [];

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

  if(warmWaters.length == 0) {
    combinedData.data = cleanWaters;
    combinedData.type = 'clean';
  }
  else if(cleanWaters.length == 0) {
    combinedData.data = warmWaters;
    combinedData.type = 'warm';
  }
  else if(warmWaters.length == 0 && cleanWaters.length == 0)
    combinedData.data = null;
  else {
    combinedData.type = 'both';
    combinedData.data = [];

    cleanWaters.forEach(function(cleanSite) {
      warmWaters.forEach(function(warmSite) {
        if(stringIsRemotelySimilar(cleanSite, warmSite)) {
          combinedData.data.push(cleanSite);
          console.log(cleanSite + " and " + warmSite + " were similar");
        }
      });
    });

    if(combinedData.data.length == 0)
      combinedData.data = cleanWaters;
  }

  // remove duplicates
  var unique = require('array-unique');
  unique(combinedData.data);

  return combinedData;
}

function stringIsRemotelySimilar(first, second) {
  if(first == second)
    return true;
  else if(first.includes(second))
    return true;

  // if still no match, trim from ,
  var trimmedFirst = first.substring(0, first.indexOf(','));

  if(second.includes(trimmedFirst) && trimmedFirst != "")
    return true;

  // if still no match, trim from ' '
  trimmedFirst = first.substring(0, first.indexOf(' '));

  if(second.includes(trimmedFirst) && trimmedFirst != "")
    return true;

  return false;
}

function complete(callback) {
  var combinedData;
  if(warmWaters != null && cleanWaters != null) {
    combinedData = combineData();

    warmWaters = null;
    cleanWaters = null;

    callback(combinedData);
  }
}
