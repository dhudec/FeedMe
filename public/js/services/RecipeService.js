angular.module('RecipeService', []).factory('Recipe', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/recipes');
        },

        create : function(recipeData) {
            return $http.post('/api/recipes', recipeData);
        },

        delete : function(id) {
            return $http.delete('/api/recipes/' + id);
        }
    }
}]);