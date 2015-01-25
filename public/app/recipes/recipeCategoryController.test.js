describe('public.controllers.RecipeCategoryController', function() {
  var $controller,
      recipeCategoryService;  

  beforeEach(function () {
    module('recipes');
    module('recipes.mock');

    inject(function(_$controller_, _recipeCategoryService_) {
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

  describe('$scope.categories.delete', function() {
    it('should call delete on the recipeCategoryService', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      expect(recipeCategoryService.deleteWasCalled).to.equal(false);
      vm.delete();
      expect(recipeCategoryService.deleteWasCalled).to.equal(true);
    });

    it('should remove the deleted category from $scope.categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      var originalNumberOfCategories = $scope.categories.length;
      vm.delete();
      expect($scope.categories.length).to.equal(originalNumberOfCategories - 1);
      expect($scope.categories.indexOf(vm)).to.equal(-1);
    });
  });

  describe('CRUD operation accessors', function() {
    it('canEdit should be true except for new categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      expect(vm.canEdit()).to.equal(true);
      $scope.addCategory();
      vm = $scope.categories[$scope.categories.length -1];
      expect(vm.canEdit()).to.equal(false);
    });

    it('isEditing should be false for saved categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      expect(vm.isEditing).to.equal(false);
    });

    it('isEditing should be true after calling edit', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      expect(vm.isEditing).to.equal(false);
      vm.edit();
      expect(vm.isEditing).to.equal(true);
    });

    it('isEditing should be true after adding new categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      $scope.addCategory();
      var vm = $scope.categories[$scope.categories.length -1];
      expect(vm.isEditing).to.equal(true);
    });

    it('canSave should be false by default for saved categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      expect(vm.canSave()).to.equal(false);
    });

    it('canSave should be true when editing', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      vm.isEditing = true
      expect(vm.canSave()).to.equal(true);
      vm.isEditing = false
      expect(vm.canSave()).to.equal(false);
    });

    it('canDelete should be true for saved and new categories', function() {
      var $scope = {};
      var controller = $controller('RecipeCategoryController', { $scope: $scope, recipeCategoryService: recipeCategoryService });
      var vm = $scope.categories[0];
      expect(vm.canDelete()).to.equal(true);
      $scope.addCategory();
      vm = $scope.categories[$scope.categories.length -1];
      expect(vm.canDelete()).to.equal(true);
    });
  });
});