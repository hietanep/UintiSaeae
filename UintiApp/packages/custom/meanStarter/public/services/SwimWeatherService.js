'use strict';

angular.module('SwimWeatherService', []).factory('SwimWeather', ['$http', function($http) {
  return {
    get: function (location) {
      var data = $http.get('/api/swim-weather/' + location);

      return data;
    }

  }
}]);
