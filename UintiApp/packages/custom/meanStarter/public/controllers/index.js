'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'SwimWeatherService',
  function ($scope, Global, SwimWeatherService) {
    $scope.global = Global;

    $scope.cities = [{
      name: 'Tampere',
    }, {
      name: 'Kittilä'
    }];

    $scope.selectedCity = { name: 'Tampere'};

    $scope.getSwimWeather = function(){
      console.log('clicked');

      $scope.placesToSwim = SwimWeatherService.get($scope.selectedCity.name);

      return $scope.placesToSwim;


    };

  }
]);
