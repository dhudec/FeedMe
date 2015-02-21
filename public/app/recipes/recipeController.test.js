describe('public.controllers.RecipeController', function() {
  var $controller,
      $location,
      $rootScope,
      $scope;  

  beforeEach(function () {
    module('recipes');
    module('recipes.mock');

    inject(function(_$controller_, _$location_, _$rootScope_) {
      $controller = _$controller_;
      $location = _$location_;
      $rootScope = _$rootScope_;
    });
  });

  beforeEach(function() {
    $scope = {};
    var controller = $controller('RecipeController', { $scope: $scope });
    $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
  });

/*
  describe('constructor', function() {
    it('should call get on the ', function() {
      expect($scope.recipes).to.have.property('length', 2);
      expect($scope.recipes[0].name).to.equal('recipe 1');
      expect($scope.recipes[1].name).to.equal('recipe 2');
    });
  });

  describe('$scope.open', function() {
    it('should navigate to the details page', function() {
      var recipe = { _id: 'abc' };
      $scope.open(recipe);
      expect($location.path()).to.equal('/recipes/' + recipe._id);
    });
  });
*/
});