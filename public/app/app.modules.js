angular.module('common', []);
angular.module('home.controllers', []);
angular.module('ingredients.services', []);
angular.module('menus.controllers', []);
angular.module('recipes.controllers', []);
angular.module('recipes.services', []);
angular.module('shoppinglists.controllers', []);

angular.module('feedMe', [
	'ngRoute',
	'toastr',
	'routes',
	'common',
	'home.controllers', 
	'ingredients.services',
	'menus.controllers', 
	'recipes.controllers',
	'recipes.services',
	'shoppinglists.controllers',
	'localytics.directives',
	'routeStyles'
	]);