describe('public.controllers.RecipeCategoryController', function() {
  var $controller,
      $rootScope,
      $scope,
      toastr,
      recipeCategoryService;  

  beforeEach(function () {
    module('recipes.controllers');
    module('recipes.services.mock');
    module('toastr.mock');

    inject(function(_$controller_, _$rootScope_, _recipeCategoryService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      recipeCategoryService = _recipeCategoryService_;
    });
  });

  beforeEach(function() {
    $scope = {};
    var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
    $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
  })

  describe('$scope.recipeCategories', function() {
    it('should return the categories returned by the recipe category service', function() {
      expect($scope.categories).to.have.property('length', 3);
      expect($scope.categories[0].model.name).to.equal('Beef');
      expect($scope.categories[1].model.name).to.equal('Chicken');
      expect($scope.categories[2].model.name).to.equal('Dinner');
    });
  });

  describe('$scope.addCategory', function() {
    it('should add a new item to $scope.categories', function() {
      expect($scope.categories).to.have.property('length', 3);
      $scope.addCategory();
      expect($scope.categories).to.have.property('length', 4);
    });
  });

  describe('$scope.categories.save', function() {
    it('should call create on the recipeCategoryService for new categories', function() {
      $scope.addCategory();
      var vm = $scope.categories[$scope.categories.length - 1];
      expect(recipeCategoryService.createWasCalled).to.equal(false);
      vm.save();
      expect(recipeCategoryService.createWasCalled).to.equal(true);
    });

    it('should call update on the recipeCategoryService for previously saved categories', function() {
      var vm = $scope.categories[0];
      expect(recipeCategoryService.updateWasCalled).to.equal(false);
      vm.save();
      expect(recipeCategoryService.updateWasCalled).to.equal(true);
    });
  });

  describe('$scope.categories.onEditCompleted', function () {
    it('should not call create on the recipeCategoryService for new categories without a name', function() {
      $scope.addCategory();
      var vm = $scope.categories[$scope.categories.length - 1];
      expect(recipeCategoryService.createWasCalled).to.equal(false);
      vm.onEditCompleted();
      expect(recipeCategoryService.createWasCalled).to.equal(false);
    });

    it('should call create on the recipeCategoryService for new categories given a name', function() {
      $scope.addCategory();
      var vm = $scope.categories[$scope.categories.length - 1];
      expect(recipeCategoryService.createWasCalled).to.equal(false);
      vm.model.name = 'Category Name';
      vm.onEditCompleted();
      expect(recipeCategoryService.createWasCalled).to.equal(true);
    });

    it('should not call update on the recipeCategoryService for previously saved categories with unchanged values', function() {
      var vm = $scope.categories[0];
      expect(recipeCategoryService.updateWasCalled).to.equal(false);
      vm.onEditCompleted();
      expect(recipeCategoryService.updateWasCalled).to.equal(false);
    });

    it('should call update on the recipeCategoryService for previously saved categories with changed values', function() {
      $scope.addCategory();
      var numberOfCategories = $scope.categories.length;
      var vm = $scope.categories[$scope.categories.length - 1];
      expect($scope.categories.length).to.equal(numberOfCategories);
      vm.onEditCompleted();
      expect($scope.categories.length).to.equal(numberOfCategories - 1);
    });

    it('should remove unchanged new categories from the collection', function() {
      var vm = $scope.categories[0];
      expect(recipeCategoryService.updateWasCalled).to.equal(false);
      vm.model.name = 'New Category';
      vm.onEditCompleted();
      expect(recipeCategoryService.updateWasCalled).to.equal(true);
    });
  });

  describe('$scope.categories.delete', function() {
    it('should call delete on the recipeCategoryService for saved recipes', function() {
      var vm = $scope.categories[0];
      expect(recipeCategoryService.deleteWasCalled).to.equal(false);
      vm.delete();
      expect(recipeCategoryService.deleteWasCalled).to.equal(true);
    });

    it('should not call delete on the recipeCategoryService for unsaved recipes', function() {
      $scope.addCategory();
      var vm = $scope.categories[$scope.categories.length -1];
      vm.delete();
      expect(recipeCategoryService.deleteWasCalled).to.equal(false);
    });

    it('should remove the deleted category from $scope.categories', function() {
      var vm = $scope.categories[0];
      var originalNumberOfCategories = $scope.categories.length;
      vm.delete();
      expect($scope.categories.length).to.equal(originalNumberOfCategories - 1);
      expect($scope.categories.indexOf(vm)).to.equal(-1);
    });
  });

  describe('CRUD operation accessors', function() {
    it('canDelete should be true for saved and new categories', function() {
      var vm = $scope.categories[0];
      expect(vm.canDelete()).to.equal(true);
      $scope.addCategory();
      vm = $scope.categories[$scope.categories.length -1];
      expect(vm.canDelete()).to.equal(true);
    });
  });
});