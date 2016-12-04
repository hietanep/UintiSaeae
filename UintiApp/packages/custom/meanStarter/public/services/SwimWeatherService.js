'use strict';

angular.module('SwimWeatherService', []).factory('SwimWeather', ['$http', function($http) {
  return {
    get: function (location) {
      return $http.get('/api/swim-weather/' + location);
    }

  }
}]);
