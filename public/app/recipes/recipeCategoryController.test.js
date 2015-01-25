describe('public.controllers.RecipeCategoryController', function() {
  var $controller,
      recipeCategoryService;  

  beforeEach(function () {
    module('recipes');
    module('recipes.mock');

    inject(function(_$controller_, _recipeCategoryService_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
      recipeCategoryService = _recipeCategoryService_;
    });
  });

  describe('$scope.recipeCategories', function() {
    it('should return the categories returned by the recipe category service', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope });
      expect($scope.categories).to.have.property('length', 3);
      expect($scope.categories[0].model.name).to.equal('Beef');
      expect($scope.categories[1].model.name).to.equal('Chicken');
      expect($scope.categories[2].model.name).to.equal('Dinner');
    });
  });

  describe('$scope.addCategory', function() {
    it('should add a new item to $scope.categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      expect($scope.categories).to.have.property('length', 3);
      $scope.addCategory();
      expect($scope.categories).to.have.property('length', 4);
      expect($scope.categories[3].hasBeenSaved()).to.equal(false);
    });
  });

  describe('$scope.categories.save', function() {
    it('should call create on the recipeCategoryService for new categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      $scope.addCategory();
      var vm = $scope.categories[$scope.categories.length - 1];
      expect(recipeCategoryService.createWasCalled).to.equal(false);
      vm.save();
      expect(recipeCategoryService.createWasCalled).to.equal(true);
    });

    it('should call update on the recipeCategoryService for previously saved categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      expect(recipeCategoryService.updateWasCalled).to.equal(false) ;
      vm.save();
      expect(recipeCategoryService.updateWasCalled).to.equal(true);
    });
  });
});