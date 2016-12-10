'use strict';

angular.module('mean.meanStarter').factory('SwimWeatherService', ['$http', function($http) {
  return {
    get: function (location, minTemp, callback) {
      $http.get('/api/swim-weather/' + location + '?minTemp=' + minTemp)
        .then(function successCallback(response) {
          callback(response);
      }, function errorCallback(response) {
          callback(response);
      });
    }
  }
}]);


