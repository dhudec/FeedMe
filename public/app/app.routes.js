angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/homeView.html',
            controller: 'HomeController'
        })
        .when('/recipes', {
            templateUrl: 'app/recipes/recipeListView.html',
            controller: 'RecipeListController'
        });

    $locationProvider.html5Mode(true);
}]);