'use strict';

var waterQuality = require('../controllers/WaterQualityController');
var weather = require('../controllers/WeatherController');

var weatherData;
var waterQualityData;

exports.getSwimWeather = function(location, minTemp, callback) {
  weather.getWeather(location, function(data) {
    weatherData = data;

    complete(callback);
  });

  waterQuality.getWaterQuality(location, minTemp, function(data) {
    waterQualityData = data;

    complete(callback);
  });

}

function combineData() {
  var combinedData = {};

  combinedData.weatherData = weatherData;
  combinedData.waterQualityData = waterQualityData;

  return combinedData;
}

function complete(callback) {
  var combinedData = {};
  if(weatherData != null && waterQualityData != null) {
    combinedData = combineData();

    weatherData = null;
    waterQualityData = null;

    callback(combinedData);
  }
}
