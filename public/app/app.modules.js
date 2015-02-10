angular.module('common', []);
angular.module('home', []);
angular.module('ingredients', []);
angular.module('recipes', []);

angular.module('feedMe', [
	'ngRoute',
	'toastr',
	'appRoutes',
	'common',
	'home', 
	'ingredients',
	'recipes',
	'localytics.directives'
	]);