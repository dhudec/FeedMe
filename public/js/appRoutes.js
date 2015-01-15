angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/recipes', {
            templateUrl: 'views/recipes.html',
            controller: 'RecipesController'
        });

    $locationProvider.html5Mode(true);

}]);