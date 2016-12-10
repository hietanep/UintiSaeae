'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'SwimWeatherService',
  function ($scope, Global, SwimWeatherService) {
    $scope.global = Global;

    $scope.temperatures = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

    $scope.cities = [{
      name: 'Tampere'
    }, {
      name: 'Rovaniemi'
    }, {
      name: 'Helsinki'
    }, {
      name: 'Turku'
    }, {
      name: 'Kuopio'
    }];

    $scope.selectedCity = $scope.cities[0];

    $scope.whenToSwim = null;
    $scope.swimInfo = null;

    $scope.selectedTemperature = 15;

    $scope.getSwimWeather = function(){
      console.log($scope.selectedCity.name, $scope.selectedTemperature);

      SwimWeatherService.get($scope.selectedCity.name, $scope.selectedTemperature, function(response) {
        console.log(response);

        if(response.data) {
          if (response.data.waterQualityData) {
            $scope.placesToSwim = response.data.waterQualityData.data;

            if (response.data.waterQualityData.type == "clean" && response.data.waterQualityData.data.length > 0)
              $scope.swimInfo = "The following waters are clean of algae but not warm enough: ";
            else if (response.data.waterQualityData.type == "warm")
              $scope.swimInfo = "The following waters are warm enough but have not been measured clean recently: ";
            else if (response.data.waterQualityData.type == "both")
              $scope.swimInfo = "The following waters have been observed warm and clean: ";
          }
          else
            $scope.swimInfo = "No warm or clean water bodies found. Swim in the nearest fountain at your own risk.";
        }
        else
          $scope.swimInfo = "No warm or clean water bodies or weather data found. Consider swimming in another country.";

        $scope.whenToSwim = "Warmest weather for swimming in the next 36 hours is " + response.data.weatherData.temp + " °C at: " + response.data.weatherData.time;
      });
    };

  }
]);
