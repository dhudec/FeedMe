describe('public.controllers.RecipeListController', function() {
  var $controller,
      $rootScope,
      $scope;  

  beforeEach(function () {
    module('recipes');
    module('recipes.mock');

    inject(function(_$controller_, _$rootScope_) {
      $controller = _$controller_;
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

  describe('$scope.recipes.totalTime', function() {
    it('should return sum of prepTime and cookTime', function() {
      expect($scope.recipes).to.not.be.a('null');
      expect($scope.recipes).to.have.property('length', 2);
      expect($scope.recipes[0].totalTime()).to.equal(3);
      expect($scope.recipes[1].totalTime()).to.equal(7);
    });
  });
});