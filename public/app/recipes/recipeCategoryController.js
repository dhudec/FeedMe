angular.module('recipes').controller('RecipeCategoryController', function($scope, recipeCategoryService) {

    recipeCategoryService.get().success(function(data) {
		$scope.categories = data.map(function(category) {
			return new RecipeCategoryViewModel(category);
		});
	});

	$scope.addCategory = function() {
		var newCategory = new RecipeCategoryViewModel({ name: '' });
		newCategory.isEditing = true;
		$scope.categories.push(newCategory);
	};

	function RecipeCategoryViewModel(category) {
		var vm = {};

		vm.model = category;

		vm.isEditing = false;

		vm.canEdit = function() {
			return !vm.isEditing;
		}

		vm.canSave = function() {
			return vm.isEditing;
		}

		vm.canDelete = function() {
			return true;
		}

		vm.edit = function() {
			vm.isEditing = true;
		};

		vm.save = function() {
			if (hasBeenSaved()) {
				recipeCategoryService.update(vm.model._id, vm.model);
			} else {
				recipeCategoryService.create(vm.model);
			}
		};

		vm.delete = function() { 
			var index = $scope.categories.indexOf(vm);
			if (index > -1) {
				$scope.categories.splice(index, 1);
			}
			recipeCategoryService.delete(vm.model._id);
		};

		var hasBeenSaved = function() {
			return typeof vm.model._id !== 'undefined';
		};

		return vm;
	}
});