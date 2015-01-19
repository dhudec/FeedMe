angular.module('recipes').controller('CreateRecipeController', function($scope, recipeService) {

	$scope.create = recipeService.create;

	recipeService.get().success(function(data, status, headers, config) {
	    $scope.recipes = data;

	    $scope.recipes.forEach(function(recipe) {
	    	recipe.totalTime = function() {
		    	return recipe.prepTime + recipe.cookTime;
		    }
	    });
	  });
});