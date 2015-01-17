angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/recipes', {
            templateUrl: 'views/recipe-list.html',
            controller: 'RecipeListController'
        });

    $locationProvider.html5Mode(true);

}]);