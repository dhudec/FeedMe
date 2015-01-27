angular.module('recipes').controller('RecipeCreateController', function($scope, recipeService, recipeCategoryService) {

	$scope.model = {};

	$scope.create = function() {
		recipeService.create($scope.model);
	}

	recipeCategoryService.get().then(function(result) {
		$scope.categories = result.data;
	});
	
});