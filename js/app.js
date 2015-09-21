angular.module('carApp', ['ui.router', 'ngResource', 'carApp.controllers', 'carApp.services', 'ui.bootstrap']);
angular.module('carApp').config(function($stateProvider){
  $stateProvider.state('cars', { 
    url: '/cars',
    templateUrl: 'partials/cars.html',
    controller: 'CarListController'
  }).state('viewCar', { 
    url: '/cars/:id/view',
    templateUrl: 'partials/car-view.html',
    controller: 'CarViewController'
  }).state('newCar', { 
    url: '/cars/new',
    templateUrl: 'partials/car-add.html',
    controller: 'CarCreateController'
  }).state('editCar', { 
    url: '/cars/:id/edit',
    templateUrl: 'partials/car-edit.html',
    controller: 'CarEditController'
  }).state('batchUpload', {
    url: '/cars/batchUpload',
    templateUrl: 'partials/batch-upload.html',
    controller: 'CarBatchUploadController'
  });
}).run(function($state) {
  $state.go('cars'); 
});
