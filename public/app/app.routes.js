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
        .when('/recipes/details/:id', {
            templateUrl: 'app/recipes/recipeView.html',
            controller: 'RecipeController'
        })
        .when('/recipes/create', {
            templateUrl: 'app/recipes/recipeEditorView.html',
            controller: 'RecipeEditorController'
        })
        .when('/recipes/update/:id', {
            templateUrl: 'app/recipes/recipeEditorView.html',
            controller: 'RecipeEditorController'
        })
        .when('/recipecategories', {
            templateUrl: 'app/recipes/receipeCategoryView.html',
            controller: 'RecipeCategoryController'
        });

    $locationProvider.html5Mode(true);
}]);