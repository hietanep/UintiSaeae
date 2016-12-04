'use strict';

var swimWeather = require('../controllers/SwimWeatherController');
var config = require('../config/config');

module.exports = function (MeanStarter, app) {
  app.get('/api', function (req, res, next) {
    return res.send('welcome to REST API');
  });

  app.get('/api/swim-weather/:location', function (req, res, next) {

    var location = req.params.location;

    return swimWeather.getSwimWeather(location);

    //return res.send(getJSONDataFromUrl(location));

  });
};
