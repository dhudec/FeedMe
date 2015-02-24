angular.module('recipes.controllers').controller('RecipeListController', function($scope, $location, recipeService) {

    recipeService.get().then(function(result) {
	    $scope.recipes = result.data;
	  });

    $scope.open = function(recipe) {
		$location.path('/recipes/details/' + recipe._id);
    }
});