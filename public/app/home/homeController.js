angular.module('home.controllers').controller('HomeController', function($scope, $location) {
 
	var gotoRecipes = function() {
		$location.path('/recipes');
	}

	var gotoMenus = function() {
		$location.path('/menus');
	}

	var gotoShoppingLists = function() {
		$location.path('/shoppinglists');
	}

	var initialize = function() {
		$scope.gotoRecipes = gotoRecipes;
		$scope.gotoMenus = gotoMenus;
		$scope.gotoShoppingLists = gotoShoppingLists;
	}

	initialize();
});
