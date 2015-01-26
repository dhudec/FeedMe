angular.module('common', []);
angular.module('home', []);
angular.module('recipes', []);

angular.module('feedMe', [
	'ngRoute',
	'toastr',
	'appRoutes',
	'common',
	'home', 
	'recipes'
	]);