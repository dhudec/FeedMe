angular.module('common', []);
angular.module('home.controllers', []);
angular.module('ingredients.services', []);
angular.module('recipes.controllers', []);
angular.module('recipes.services', []);

angular.module('feedMe', [
	'ngRoute',
	'toastr',
	'routes',
	'common',
	'home.controllers', 
	'ingredients.services',
	'recipes.controllers',
	'recipes.services',
	'localytics.directives'
	]);