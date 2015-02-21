angular.module('recipes').controller('RecipeController', function($scope, $location, $routeParams, recipeService) {

    var loadRecipe = function() {
    	if (typeof $routeParams.id !== 'undefined') {
    		recipeService.get($routeParams.id).then(function(result) {
			    $scope.model = result.data;

			    $scope.recipes.forEach(function(recipe) {
			    	recipe.totalTime = function() {
				    	return recipe.prepTime + recipe.cookTime;
				    }
			    });
		  	});
		}
    }

    var edit = function() {
		$location.path('/recipes/update/' + $scope.model._id);
    }

    var initialize = function () {
    	loadRecipe();
		$scope.edit = edit;    	
    }

    initialize();
});