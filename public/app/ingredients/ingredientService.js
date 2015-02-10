angular.module('ingredients').factory('ingredientService', ['$http', function($http) {
    var service = {};

    service.getUnits = function() {
        return $http.get('/api/ingredients/units');
    };

    return service;
}]);