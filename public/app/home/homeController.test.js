describe('public.app.home.HomeController', function() {
  var $controller,
      $location,
      $scope;

  beforeEach(function () {
    module('home.controllers');

    inject(function(_$controller_, _$location_) {
      $controller = _$controller_;
      $location = _$location_;
    });
  });

  beforeEach(function() {
    $scope = {};
    var controller = $controller('HomeController', { $scope: $scope });
  });


  describe('gotoRecipes', function() {
    it('should set $location.path to /recipes', function() {
      $scope.gotoRecipes();
      expect($location.path()).to.equal('/recipes');
    });
  });

  describe('gotoMenus', function() {
    it('should set $location.path to /menus', function() {
      $scope.gotoMenus();
      expect($location.path()).to.equal('/menus');
    });
  });

  describe('gotoShoppingLists', function() {
    it('should set $location.path to /shoppinglists', function() {
      $scope.gotoShoppingLists();
      expect($location.path()).to.equal('/shoppinglists');
    });
  });
});