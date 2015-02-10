angular.module('ingredients').factory('ingredientService', ['$http', function($http) {
    var service = {};

    service.get = function() {
        return $http.get('/api/ingredients/units');
    };

    return service;
}]);