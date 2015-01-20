angular.module('recipes').factory('recipeService', ['$http', function($http) {
    var recipeService = {};

    recipeService.get = function() {
        return $http.get('/api/recipes');
    };

    recipeService.create = function(recipeData) {
        return $http.post('/api/recipes', recipeData);
    };

    recipeService.delete = function(id) {
        return $http.delete('/api/recipes/' + id);
    };
    
    return recipeService;
}]);