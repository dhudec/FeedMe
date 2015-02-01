angular.module('common', []);
angular.module('home', []);
angular.module('recipes', []);

angular.module('feedMe', [
	'ngRoute',
	'ng-Autocomplete',
	'toastr',
	'appRoutes',
	'common',
	'home', 
	'recipes','localytics.directives'
	]);