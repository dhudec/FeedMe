angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/homeView.html',
            controller: 'HomeController'
        })
        .when('/recipes', {
            templateUrl: 'app/recipes/recipeListView.html',
            controller: 'RecipeListController'
        })
        .when('/recipes/create', {
            templateUrl: 'app/recipes/recipeCreateView.html',
            controller: 'RecipeCreateController'
        })
        .when('/recipeCategories', {
            templateUrl: 'app/recipes/receipeCategoryView.html',
            controller: 'RecipeCategoryController'
        });

    $locationProvider.html5Mode(true);
}]);