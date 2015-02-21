angular.module('common', []);
angular.module('home', []);
angular.module('ingredients.services', []);
angular.module('recipes.controllers', []);
angular.module('recipes.services', []);

angular.module('feedMe', [
	'ngRoute',
	'toastr',
	'appRoutes',
	'common',
	'home', 
	'ingredients.services',
	'recipes.controllers',
	'recipes.services',
	'localytics.directives'
	]);