'use strict';

var waterQuality = require('../controllers/WaterQualityController');
var weather = require('../controllers/WeatherController');

var weatherData = {};
var waterQualityData = {};

exports.getSwimWeather = function(location, callback) {
  weather.getWeather(location, function(data) {
    weatherData = data;

    complete(callback);
  });

  waterQuality.getWaterQuality(location, 10, function(data) {
    waterQualityData = data;

    complete(callback);
  });

}

function combineData() {
  var combinedData = {};

  // combined = weather + quality

  return combinedData;
}

function complete(callback) {
  var combinedData = {};
  if(weatherData !== null && waterQualityData !== null) {
    combinedData = combineData();

    callback(combinedData);
  }
}
