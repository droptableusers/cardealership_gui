angular.module('carApp.controllers', []).controller('CarListController', function($scope, $state, popupService, $window, Car) {
  $scope.query = '';
  $scope.currentPage=1;
  $scope.numPerPage=10;
  $scope.totalHits=1;

  $scope.searchCars = function() {
    $scope.cars = Car.query({q : $scope.query + '*', 
      from: ($scope.currentPage-1) * $scope.numPerPage,
      pageSize: $scope.numPerPage
    }, function(){
      $scope.totalHits = $scope.cars.totalHits; 
    }); 
  };
  $scope.$watch('currentPage', function() {
    $scope.searchCars();
  });
  //$scope.searchCars();

  $scope.deleteCar = function(car) { 
    if (popupService.showPopup('Really delete this?')) {
      Car.delete({id: car.id}, function() {
        $window.location.href = ''; 
      });
    }
  };
}).controller('CarViewController', function($scope, $stateParams, Car) {
  $scope.car = Car.get({ id: $stateParams.id }); 
}).controller('CarCreateController', function($scope, $state, $stateParams, Car) {
  $scope.car = new Car();  

  $scope.addCar = function() { 
    $scope.car.$save(function() {
      $state.go('cars'); 
    });
  };
}).controller('CarEditController', function($scope, $state, $stateParams, Car) {
  $scope.updateCar = function() { 
    $scope.car.$update(function() {
      $state.go('cars'); 
    });
  };

  $scope.loadCar = function() { 
    $scope.car = Car.get({ id: $stateParams.id });
  };

  $scope.loadCar(); 
}).controller('CarBatchUploadController', function($scope, $http, $state) {
  $scope.uploadFile = function(files) {
    var api = "http://localhost:8080/cars/batch";
    var authToken = 'Basic YWRhbTpzZWNyZXQ=';
    var fd = new FormData();
    fd.append("file", files[0]);
    $http.post(api , fd, {
      withCredentials: true,
      headers: {'Content-Type': undefined, 'Authorization': authToken },
      transformRequest : angular.identity
    }).success(function(data) {
      $state.go('cars');
    }).error(function(data) {
      console.log(data);
      $state.go('cars');
    });
  };
});
