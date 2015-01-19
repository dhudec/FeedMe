angular.module('recipes').controller('RecipeCreateController', function($scope, recipeService) {

	$scope.create = recipeService.create;
	
});