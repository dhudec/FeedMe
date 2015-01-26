angular.module('recipes').controller('RecipeCategoryController', function($scope, toastr, recipeCategoryService) {

    recipeCategoryService.get().then(function(result) {
		$scope.categories = result.data.map(function(category) {
			return new RecipeCategoryViewModel(category);
		});
	});

	$scope.addCategory = function() {
		var newCategory = new RecipeCategoryViewModel({ name: '' });
		$scope.categories.push(newCategory);
		newCategory.isFocused = true;
	};

	function RecipeCategoryViewModel(category) {
		var vm = {};
		var pristineModel = angular.copy(category);

		vm.model = category;
		vm.isFocused = false;

		vm.canDelete = function() {
			return true;
		}

		vm.test = function() {
			vm.isFocused = true;
		}

		vm.onEditCompleted = function() {
			if (hasUnsavedChanges()) {
				vm.save();
			} else if (!hasBeenSaved()) {
				removeFromCollection();
			}
		}

		vm.save = function() {
			if (hasBeenSaved()) {
				recipeCategoryService.update(vm.model._id, vm.model).then(onSaveSuccess, onSaveError);
			} else {
				recipeCategoryService.create(vm.model).then(onSaveSuccess, onSaveError);
			}
		};

		vm.delete = function() { 
			if (hasBeenSaved()) {
				recipeCategoryService.delete(vm.model._id);
			}
			removeFromCollection();
		};

		var onSaveSuccess = function(response) {
			pristineModel = response.data;
			vm.model = response.data;
			toastr.success("Category saved.");
		}

		var onSaveError = function(err) {
			toastr.error("An error occurred while saving. " + err);
		}

		var hasUnsavedChanges = function() {
			return !angular.equals(pristineModel, vm.model);
		}

		var hasBeenSaved = function() {
			return typeof vm.model._id !== 'undefined';
		};

		var removeFromCollection = function() {
			var index = $scope.categories.indexOf(vm);
			if (index > -1) {
				$scope.categories.splice(index, 1);
			}
		}

		return vm;
	}
});