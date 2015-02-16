describe('public.controllers.RecipeEditorController', function() {
  var $controller,
      $rootScope,
      $scope,
      routeParams = {},
      toastr,
      recipeService,
      recipeCategoryService,
      ingredientService;  

  beforeEach(function () {
    module('recipes');
    module('recipes.mock');
    module('ingredients.mock');
    module('toastr.mock');

    inject(function(_$controller_, _$rootScope_, _recipeService_, _recipeCategoryService_, _ingredientService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      recipeService = _recipeService_;
      recipeCategoryService = _recipeCategoryService_;
      ingredientService = _ingredientService_;
    });
  });

  beforeEach(function() {
    $scope = {};
    var controller = $controller('RecipeEditorController', { $scope: $scope, $routeParams: routeParams, recipeService: recipeService, recipeCategoryService: recipeCategoryService, ingredientService: ingredientService });
    $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
  })

  describe('$scope.model', function() {
    it('should be defined', function() {
      expect($scope.model).not.to.be.undefined;
    });
  });

  describe('$scope.model.ingredients', function() {
    it('should be an array', function() {
      expect($scope.model.ingredients).to.be.an('array');
    });
  });

  describe('$scope.addIngredient', function() {
    it('should add an element to the ingredients array', function() {
      var initialIngredientCount = $scope.model.ingredients.length;
      $scope.addIngredient();
      expect($scope.model.ingredients.length).to.equal(initialIngredientCount + 1);
    });
  });

  describe('$scope.removeIngredient', function() {
    it('should remove the ingredient from the array', function() {
      $scope.addIngredient();
      var initialIngredientCount = $scope.model.ingredients.length;
      var ingredient = $scope.model.ingredients[initialIngredientCount - 1];
      $scope.removeIngredient(ingredient);
      var index = $scope.model.ingredients.indexOf(ingredient);
      expect(index).to.equal(-1);
      expect($scope.model.ingredients.length).to.equal(initialIngredientCount - 1);
    });
  });
/*
  describe('$scope.save when $routeParams.id is undefined', function() {
    it('should remove the ingredient from the array', function() {
      $scope.addIngredient();
      var initialIngredientCount = $scope.model.ingredients.length;
      var ingredient = $scope.model.ingredients[initialIngredientCount - 1];
      $scope.removeIngredient(ingredient);
      var index = $scope.model.ingredients.indexOf(ingredient);
      expect(index).to.equal(-1);
      expect($scope.model.ingredients.length).to.equal(initialIngredientCount - 1);
    });
  });

  describe('$scope.save when $routeParams is defined', function() {
    it('should remove the ingredient from the array', function() {
      $scope.addIngredient();
      var initialIngredientCount = $scope.model.ingredients.length;
      var ingredient = $scope.model.ingredients[initialIngredientCount - 1];
      $scope.removeIngredient(ingredient);
      var index = $scope.model.ingredients.indexOf(ingredient);
      expect(index).to.equal(-1);
      expect($scope.model.ingredients.length).to.equal(initialIngredientCount - 1);
    });
  });
*/
});