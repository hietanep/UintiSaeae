'use strict';

var waterQuality = require('../controllers/WaterQualityController');
var weather = require('../controllers/WeatherController');

exports.getSwimWeather = function(location) {
  var swimWeatherData = {};

  var weatherData = weather.getWeather(location);

  var waterQualityData = waterQuality.getWaterQuality(location);

  swimWeatherData = combineData(weatherData, waterQualityData);

  return swimWeatherData;

}

function combineData(weather, quality) {
  var combinedData = {};

  // combined = weather + quality

  return combinedData;
}
