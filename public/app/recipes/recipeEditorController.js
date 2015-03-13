angular.module('recipes.controllers').controller('RecipeEditorController', function($scope, $location, $routeParams, _, toastr, recipeService, recipeCategoryService, ingredientService) {

	var isUpdating = false;

	var title = function() {
		return isUpdating ? 'Edit Recipe' : 'Create a New Recipe';
	}

	var parseRouteParams = function() {
		if (typeof $routeParams.id !== 'undefined') {
			isUpdating = true;
			recipeService.getById($routeParams.id).then(function(result) {
				$scope.model = result.data;
			}, function (err) {
				toastr.error("An error occurred while loading the recipe. " + err);	
		  	});
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

	var getSelectedCategoryIds = function() {
		return _.pluck($scope.model.categories, '_id');
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

	var save = function() {
		if (typeof $scope.model.ingredients !== 'undefined') {
			for (var i = $scope.model.ingredients.length - 1; i > -1; i--) {
				var ingredient = $scope.model.ingredients[i];
				if (typeof ingredient.item ==='undefined' || typeof ingredient.item.name === 'undefined' || !ingredient.item.name.length)
					$scope.model.ingredients.splice(i, 1);
			}
		}

		if (typeof $scope.model._id === 'undefined') {
			recipeService.create($scope.model).then(function() {
				$location.path('/recipes');
				toastr.success("Recipe saved.");
			}, function (err) {
				toastr.error("An error occurred while saving. " + err);			
			});
		} else {			
			recipeService.update($scope.model).then(function() {
				$location.path('/recipes/details/' + $scope.model._id);
				toastr.success("Recipe saved.");
			}, function (err) {
				toastr.error("An error occurred while saving. " + err);			
			});
		}
	}

	var cancel = function() {
		if (isUpdating)
			$location.path('/recipes/details/' + $scope.model._id);
		else
			$location.path('/recipes');
	}

	var initialize = function() {
		$scope.model = {};
		$scope.model.ingredients = [];
		$scope.title = title;
		$scope.addIngredient = addIngredient;
		$scope.removeIngredient = removeIngredient;
		$scope.save = save;
		$scope.cancel = cancel;

		parseRouteParams();
		addIngredient();
		getRecipeCategories();
		getIngredientUnits();
	}

	initialize();
});