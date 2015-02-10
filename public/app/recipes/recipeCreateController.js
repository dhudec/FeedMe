angular.module('recipes').controller('RecipeCreateController', function($scope, recipeService, recipeCategoryService, ingredientService) {

	var addIngredient = function() {
		$scope.model.ingredients.push({item:{}});
	}

	var removeIngredient = function(ingredient) {
		var index = $scope.model.ingredients.indexOf(ingredient);
		if (index > -1)
			$scope.model.ingredients.splice(index, 1);
	}

	var getRecipeCategories = function() {
		recipeCategoryService.get().then(function(result) {
			$scope.categories = result.data;
		});
	}

	var getIngredientUnits = function() {
		ingredientService.getUnits().then(function(result) {
			$scope.units = result.data;
		});
	}

	var createRecipe = function() {
		$scope.model.ingredients.forEach(function(ingredient, index, array) {
			if (typeof ingredient.item.name === 'undefined' || ingredient.item.name == '')
				array.splice(index, 1);
		});
		recipeService.create($scope.model);
	}

	var initialize = function() {
		$scope.model = {};
		$scope.model.ingredients = [];
		$scope.addIngredient = addIngredient;
		$scope.removeIngredient = removeIngredient;
		$scope.create = createRecipe;

		addIngredient();
		getRecipeCategories();
		getIngredientUnits();
	}

	initialize();
});