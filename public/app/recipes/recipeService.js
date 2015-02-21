angular.module('recipes.services').factory('recipeService', function($http, $q) {
    var recipeService = {};

    recipeService.get = function() {
        var deferred = $q.defer();
        $http.get('/api/recipes').then(function(result) {
            result.data.forEach(function(recipe) {
                recipe.totalTime = totalTimeFunc(recipe);
            });
            deferred.resolve(result);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    recipeService.getById = function(id) {
        var deferred = $q.defer();
        $http.get('/api/recipes/' + id).then(function(result) {
            result.data.totalTime = totalTimeFunc(result.data);
            deferred.resolve(result);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    recipeService.create = function(recipeData) {
        return $http.post('/api/recipes', recipeData);
    };

    recipeService.update = function(recipeData) {
        return $http.put('/api/recipes/' + recipeData._id, recipeData);
    };

    recipeService.delete = function(id) {
        return $http.delete('/api/recipes/' + id);
    };

    var totalTimeFunc = function(recipe) {
        return function () {
            return recipe.prepTime + recipe.cookTime;
        }
    }
    
    return recipeService;
});