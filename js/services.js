
var api = "http://localhost:14321";
var authToken = 'Basic YWRhbTpzZWNyZXQ=';
angular.module('carApp.services', []).factory('Car', function($resource) {
  return $resource(api + '/cars/:id', 
    {id : '@id'},
    {
      query: {
        isArray:false,
        headers: {'Authorization': authToken} 
      },
      get : {
        headers: {'Authorization': authToken} 
      },
      save: {
        method: 'POST',
        headers: {'Authorization': authToken} 
      },
      update: { 
        method: 'PUT',
        headers: {'Authorization': authToken} 
      },
      delete: {
        method: 'DELETE',
        headers: {'Authorization': authToken}
      }
    }
  );
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});

