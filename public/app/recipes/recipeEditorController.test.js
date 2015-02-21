describe('public.controllers.RecipeEditorController', function() {
  var $controller,
      $location,
      $rootScope,
      $scope,
      $routeParams = {},
      toastr,
      recipeService,
      recipeCategoryService,
      ingredientService;  

  beforeEach(function () {
    module('recipes.controllers');
    module('recipes.services.mock');
    module('ingredients.services.mock');
    module('toastr.mock');

    inject(function(_$controller_, _$location_, _$rootScope_, _toastr_, _recipeService_, _recipeCategoryService_, _ingredientService_) {
      $controller = _$controller_;
      $location = _$location_;
      $rootScope = _$rootScope_;
      toastr = _toastr_
      recipeService = _recipeService_;
      recipeCategoryService = _recipeCategoryService_;
      ingredientService = _ingredientService_;
    });
  });

  beforeEach(function() {
    $scope = {};
    var controller = $controller('RecipeEditorController', { $scope: $scope, $location: $location, $routeParams: $routeParams, recipeService: recipeService, recipeCategoryService: recipeCategoryService, ingredientService: ingredientService });
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

  describe('$scope.save when $scope.model._id is undefined', function() {
    it('should call create on the recipe service and pass the model', function() {
      $scope.model = { name: 'test' };
      expect(recipeService.createWasCalled).to.equal(false);
      $scope.save();
      $rootScope.$digest();
      expect(recipeService.createWasCalled).to.equal(true);
      expect(recipeService.createArgs).to.equal($scope.model);
    });

    it('should remove ingredients without a name', function() {
      $scope.model = { name: 'test', ingredients: [ {item: { name: '' }}, {item: { }}, {item: { }}, {item: { name: 'name' }} ] };
      $scope.save();
      $rootScope.$digest();
      var arg = recipeService.createArgs;
      expect(arg.ingredients.length).to.equal(1);
      expect(arg.ingredients[0].item.name).to.equal('name');
    });

    it('should navigate to the /recipes age', function() {
      $scope.model = { name: 'test' };
      $scope.save();
      $rootScope.$digest();
      expect($location.path()).to.equal('/recipes');
    });

    it('should show a success toast', function() {
      $scope.model = { name: 'test' };
      $scope.save();
      $rootScope.$digest();
      expect(toastr.successWasCalled).to.equal(true);
    });
  });

  describe('$scope.save when $scope.model._id is defined', function() {
    it('should call update on the recipe service and pass the model', function() {
      $scope.model = { _id: 'abcdef', name: 'recipe' };
      expect(recipeService.updateWasCalled).to.equal(false);
      $scope.save();
      $rootScope.$digest();
      expect(recipeService.updateWasCalled).to.equal(true);
      expect(recipeService.updateArgs).to.equal($scope.model);
    });

    it('should show a success toast', function() {
      $scope.model = { _id: 'abcdef', name: 'recipe' };
      $scope.save();
      $rootScope.$digest();
      expect(toastr.successWasCalled).to.equal(true);
    });
  });
});