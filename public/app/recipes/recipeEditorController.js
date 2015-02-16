angular.module('recipes').controller('RecipeEditorController', function($scope, $location, $routeParams, toastr, recipeService, recipeCategoryService, ingredientService) {

	var parseRouteParams = function() {
		if (typeof $routeParams.id !== 'undefined') {
			recipeService.get($routeParams.id).then(function(result) {
				$scope.model = result.data;
			})
		}
	}

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

	var saveRecipe = function() {
		$scope.model.ingredients.forEach(function(ingredient, index, array) {
			if (typeof ingredient.item.name === 'undefined' || ingredient.item.name == '')
				array.splice(index, 1);
		});
		recipeService.create($scope.model).then(function() {
			$location.path('/recipes');
			toastr.success("Recipe saved.");
		}, function (err) {
			toastr.error("An error occurred while saving. " + err);			
		});
	}

	var initialize = function() {
		$scope.model = {};
		$scope.model.ingredients = [];
		$scope.localImage = {};
		$scope.addIngredient = addIngredient;
		$scope.removeIngredient = removeIngredient;
		$scope.save = saveRecipe;

		parseRouteParams();
		addIngredient();
		getRecipeCategories();
		getIngredientUnits();
	}

	initialize();
});