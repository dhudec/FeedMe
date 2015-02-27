angular.module('routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
            controller: 'RecipeEditorController',
            css: 'assets/css/recipes/recipeEditor.css'
        })
        .when('/recipes/update/:id', {
            templateUrl: 'app/recipes/recipeEditorView.html',
            controller: 'RecipeEditorController',
            css: 'assets/css/recipes/recipeEditor.css'
        })
        .when('/recipecategories', {
            templateUrl: 'app/recipes/recipeCategoryView.html',
            controller: 'RecipeCategoryController',
            css: 'assets/css/recipes/recipeCategory.css'
        })

        .when('/menus', {
            templateUrl: 'app/menus/menuListView.html',
            controller: 'MenuListController'
        })

        .when('/shoppinglists', {
            templateUrl: 'app/shoppinglists/shoppinglistListView.html',
            controller: 'ShoppingListListController'
        })

    $locationProvider.html5Mode(true);
}]);