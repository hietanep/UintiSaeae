/**
 * application on use RESTful API
 */

 
 var myApp = angular.module('myApp', []); 
 
 // vakiot
 myApp.value('globaalit', {
    appName: 'restful Front',
    appVersion: 0.1,
    restUrl: 'http://localhost:3000'
});

 
 
 
 myApp.controller('AppCtrl', ['$scope', '$http', 'globaalit', function($scope, $http, globaalit) {

	$scope.getMovie = function(){
		$http.get(globaalit.restUrl+'/movie/'+$scope.name).success(function(response){
			console.log("I got the data, I requested");
			$scope.response = response;
			$scope.name = "";
		});
	}

	 $scope.getSaa = function(){
		 $http.get(globaalit.restUrl+'/fmi/'+$scope.location).success(function(response){
			 console.log("I got the data, I requested");
			 $scope.saa = response;
			 $scope.location = "";
		 });
	 }
}]);