describe('public.app.recipes.RecipeEditorController', function() {
  var $controller,
      $location,
      $rootScope,
      $scope,
      $routeParams,
      toastr,
      recipeService,
      recipeCategoryService,
      ingredientService;  

  beforeEach(function () {
    module('recipes.controllers');
    module('recipes.services.mock');
    module('ingredients.services.mock');
    module('toastr.mock');
    
    $routeParams = {};
    
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
    initializeController();
  })

  var initializeController = function() {
    $scope = {};
    var controller = $controller('RecipeEditorController', { $scope: $scope, $location: $location, $routeParams: $routeParams, recipeService: recipeService, recipeCategoryService: recipeCategoryService, ingredientService: ingredientService });
    $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
  }

  describe('$scope.model', function() {
    it('should be defined when creating a new recipe', function() {
      expect($scope.model).not.to.be.undefined;
    });

    it('should not call recipeService.getById when creating a new recipe', function() {
      expect($scope.model).not.to.be.undefined;
      expect(recipeService.getByIdWasCalled).to.equal(false);
    });

    it('should call recipeService.getById when updating a recipe', function() {
      $routeParams = { id: 'id123' };
      initializeController();
      expect(recipeService.getByIdWasCalled).to.equal(true);
      expect(recipeService.getByIdArgs).to.equal($routeParams.id);
    });

    it('should set $scope.model to an instance with _id = $routeParams.id', function() {
      $routeParams = { id: 'id123' };
      initializeController();
      expect($scope.model._id).to.equal($routeParams.id);
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

    it('should navigate to the /recipes page', function() {
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

  describe('$scope.cancel when $routeParams.id is defined', function() {
    it('should navigate back to the recipe details page without saving', function() {
      $routeParams = { id: 'abc123'}
      initializeController();
      $scope.cancel();
      expect($location.path()).to.equal('/recipes/details/' + $routeParams.id)
      expect(recipeService.createWasCalled).to.equal(false);
      expect(recipeService.updateWasCalled).to.equal(false);
    });
  });

  describe('$scope.cancel when $routeParams.id is defined', function() {
    it('should navigate back to the recipe list page without saving', function() {
      $scope.cancel();
      expect($location.path()).to.equal('/recipes')
      expect(recipeService.createWasCalled).to.equal(false);
      expect(recipeService.updateWasCalled).to.equal(false);
    });
  });

  describe('$scope.title', function() {
    it('should equal Create a New Recipe when not updating', function () {
      expect($scope.title()).to.equal('Create a New Recipe');
    });

    it('should equal Edit Recipe when updating', function () {
      $routeParams = { id: 'id123' };
      initializeController();

      expect($scope.title()).to.equal('Edit Recipe');
    });
  });
});