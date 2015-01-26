angular.module('recipes').controller('RecipeListController', function($scope, recipeService) {

    recipeService.get().then(function(result) {
	    $scope.recipes = result.data;

	    $scope.recipes.forEach(function(recipe) {
	    	recipe.totalTime = function() {
		    	return recipe.prepTime + recipe.cookTime;
		    }
	    });
	  });
});