angular.module('recipes.services').factory('recipeCategoryService', ['$http', function($http) {
    var service = {};

    service.get = function() {
        return $http.get('/api/recipeCategories');
    };

    service.create = function(recipeCategoryData) {
        return $http.post('/api/recipeCategories', recipeCategoryData);
    };

    service.update = function (id, recipeCategoryData) {
        return $http.put('/api/recipeCategories/' + id, recipeCategoryData);
    }

    service.delete = function(id) {
        return $http.delete('/api/recipeCategories/' + id);
    }

    return service;
}]);