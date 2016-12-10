'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'SwimWeatherService',
  function ($scope, Global, SwimWeatherService) {
    $scope.global = Global;

    $scope.temperatures = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    $scope.cities = [{
      name: 'Tampere',
    }, {
      name: 'Kittilä'
    }];

    $scope.selectedCity = $scope.cities[0];

    $scope.selectedTemperature = 15;

    $scope.getSwimWeather = function(){
      console.log($scope.selectedCity.name, $scope.selectedTemperature);

      SwimWeatherService.get($scope.selectedCity.name, $scope.selectedTemperature, function(response) {
        $scope.placesToSwim = response;
      });

      return $scope.placesToSwim;


    };

  }
]);
