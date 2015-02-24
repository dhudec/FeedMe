describe('public.controllers.RecipeListController', function() {
  var $controller,
      $location,
      $rootScope,
      $scope;  

  beforeEach(function () {
    module('recipes.controllers');
    module('recipes.services.mock');

    inject(function(_$controller_, _$location_, _$rootScope_) {
      $controller = _$controller_;
      $location = _$location_;
      $rootScope = _$rootScope_;
    });
  });

  beforeEach(function() {
    $scope = {};
    var controller = $controller('RecipeListController', { $scope: $scope });
    $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
  });

  describe('$scope.recipes', function() {
    it('should return the recipes returned by the recipe service', function() {
      expect($scope.recipes).to.have.property('length', 2);
      expect($scope.recipes[0].name).to.equal('recipe 1');
      expect($scope.recipes[1].name).to.equal('recipe 2');
    });
  });

  describe('$scope.open', function() {
    it('should navigate to the details page', function() {
      var recipe = { _id: 'abc' };
      $scope.open(recipe);
      expect($location.path()).to.equal('/recipes/details/' + recipe._id);
    });
  });
});