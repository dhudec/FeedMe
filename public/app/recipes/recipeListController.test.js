/*describe('public.controllers.RecipeListController', function() {
  beforeEach(module('FeedMe'));

  var $controller;
beforeEach(function () {
  DataServiceMock= {}
  DataServiceMock.doSomething = function() {}
  module(function ($provide) {
    $provide.value('DataService', DataServiceMock)
  })
})
  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.totalTime', function() {
    it('should return sum of prepTime and cookTime', function() {
      var $scope = {};
      var controller = $controller('RecipeListController', { $scope: $scope });
      $scope.recipes = [ { name: 'Test', prepTime: 10, cookTime: 20 }];
      expect($scope.totalTime()).to.equal(30);
    });
  });
});*/