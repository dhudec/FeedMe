angular.module('recipes.controllers').controller('RecipeController', function($scope, $location, $routeParams, recipeService, toastr) {

    var loadRecipe = function() {
    	if (typeof $routeParams.id !== 'undefined') {
    		recipeService.getById($routeParams.id).then(function(result) {
			    $scope.model = result.data;
		  	}, function (err) {
				toastr.error("An error occurred while loading the recipe. " + err);	
		  	});
		}
    }

    var edit = function() {
		$location.path('/recipes/update/' + $scope.model._id);
    }

    var initialize = function () {
    	loadRecipe();
		$scope.edit = edit;    	
    }

    initialize();
});