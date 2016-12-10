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
  var temperatures = temperatureResults.firstChild.childNamed('gml:rangeSet').firstChild.childNamed('gml:doubleOrNilReasonTupleList').val;
  var hours = temperatureResults.firstChild.childNamed('gml:domainSet').firstChild.childNamed('gmlcov:positions').val;

  var tempArr = temperatures.split('\n                ');
  var hourArr = hours.split('\n                ');

  // the first and last elements of the arrays are empty because I don't know where to split
  tempArr.pop();
  hourArr.pop();
  tempArr.splice(0, 1);
  hourArr.splice(0, 1);

  // there is a space after each tempArr element, trim it off and parse to float
  for(var i = 0; i<tempArr.length; i++) {
    tempArr[i] = parseFloat(tempArr[i].trim());
  }

  var maxTemp = Math.max.apply(null, tempArr);
  var warmestHourIndex = tempArr.indexOf(maxTemp);

  var warmestHour = hourArr[warmestHourIndex];

  warmestHour = warmestHour.substring((warmestHour.lastIndexOf(' ') + 1), warmestHour.length);

  return warmestHour;
}



