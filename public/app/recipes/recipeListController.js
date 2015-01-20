angular.module('recipes').controller('RecipeListController', function($scope, recipeService) {

    recipeService.get().success(function(data) {
	    $scope.recipes = data;

	    $scope.recipes.forEach(function(recipe) {
	    	recipe.totalTime = function() {
		    	return recipe.prepTime + recipe.cookTime;
		    }
	    });
	  });
});