angular.module('recipes.controllers').controller('RecipeListController', function($scope, $location, recipeService) {

    var loadRecipes = function () {
    	recipeService.get().then(function(result) {
		    $scope.recipes = result.data;
		});
    }

    var open = function(recipe) {
		$location.path('/recipes/details/' + recipe._id);
    }

    var initialize = function () {
    	loadRecipes();
		$scope.open = open;
    }

    initialize();
});