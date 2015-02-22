describe('public.controllers.RecipeController', function() {
  var $controller,
      $location,
      $routeParams = { id: 'id123' },
      $rootScope,
      $scope,
      toastr,
      recipeService;  

  beforeEach(function () {
    module('recipes.controllers');
    module('recipes.services.mock');
    module('toastr.mock');

    inject(function(_$controller_, _$location_, _$rootScope_, _toastr_, _recipeService_) {
      $controller = _$controller_;
      $location = _$location_;
      $rootScope = _$rootScope_;
      toastr = _toastr_;
      recipeService = _recipeService_;
    });
  });

  beforeEach(function() {
    $scope = {};
    var controller = $controller('RecipeController', { $scope: $scope, $routeParams: $routeParams });
    $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
  });


  describe('constructor', function() {
    it('should call getById on the recipeService with the id provided in the routeParams', function() {
      expect(recipeService.getByIdWasCalled).to.equal(true);
      expect(recipeService.getByIdArgs).to.equal($routeParams.id);
    });

    it('should set the model a recipe with the id provided by the routeParams', function() {
      expect($scope.model._id).to.equal($routeParams.id);
    });
  });

  describe('$scope.edit', function() {
    it('should navigate to the update page', function() {
      $scope.model = { _id: 'abc', name: 'recipe' };
      $scope.edit();
      expect($location.path()).to.equal('/recipes/update/' + $scope.model._id);
    });
  });

  describe('$scope.showCategories', function() {
    it('should be false if the model has no categories', function() {
      $scope.model = { _id: 'abc', name: 'recipe', categories: [] };
      expect($scope.showCategories()).to.equal(false);
    });

    it('should be true if the model has any categories', function() {
      $scope.model = { _id: 'abc', name: 'recipe', categories: [ { name: 'Category' } ] };
      expect($scope.showCategories()).to.equal(true);
    });
  });
});