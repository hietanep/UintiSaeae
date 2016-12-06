'use strict';

var swimWeather = require('../controllers/SwimWeatherController');
var config = require('../config/config');

module.exports = function (MeanStarter, app) {
  app.get('/api', function (req, res, next) {
    return res.send('welcome to REST API');
  });

  app.get('/api/swim-weather/:location', function (req, res, next) {

    var location = req.params.location;

    swimWeather.getSwimWeather(location, function(data) {
      res.json(data);
    });

  });
};