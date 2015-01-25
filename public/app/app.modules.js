angular.module('home', []);
angular.module('recipes', []);

angular.module('feedMe', [
	'ngRoute', 
	'appRoutes', 
	'home', 
	'recipes'
	]);