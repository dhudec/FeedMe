angular.module('recipes').controller('RecipeCategoryController', function($scope, recipeCategoryService) {

    recipeCategoryService.get().success(function(data) {
		$scope.categories = data.map(function(category) {
			return new RecipeCategoryViewModel(category);
		});
	});

	$scope.addCategory = function() {
		$scope.categories.push(new RecipeCategoryViewModel({ name: '' }));
	};

	function RecipeCategoryViewModel(category) {
		var vm = {};

		vm.model = category;

		vm.hasBeenSaved = function() {
			return typeof vm.model._id !== 'undefined';
		};

		vm.save = function() {
			if (vm.hasBeenSaved()) {
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

		return vm;
	}
});