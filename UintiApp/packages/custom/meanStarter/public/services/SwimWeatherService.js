'use strict';

angular.module('mean.meanStarter').factory('SwimWeatherService', ['$http', function($http) {
  return {
    get: function (location) {
      var data = $http.get('/api/swim-weather/' + location);

      return data;
    }

  }
}]);


