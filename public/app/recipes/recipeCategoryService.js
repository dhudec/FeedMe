angular.module('recipes').factory('recipeCategoryService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/recipeCategories');
        },

        create : function(recipeCategoryData) {
            return $http.post('/api/recipeCategories', recipeCategoryData);
        },

        delete : function(id) {
            return $http.delete('/api/recipeCategories/' + id);
        }
    }
}]);