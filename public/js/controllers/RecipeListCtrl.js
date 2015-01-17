angular.module('RecipeListCtrl', []).controller('RecipeListController', function($scope, RecipeService) {

    RecipeService.get().success(function(data, status, headers, config) {
	    $scope.recipes = data;
	  });

});