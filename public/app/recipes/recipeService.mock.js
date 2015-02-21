angular.module('recipes.mock').factory('recipeService', function($q) {
    var recipeService = {};

    recipeService.getWasCalled = false;
    recipeService.get = function() {
        var deferred = $q.defer();
		var result = { data: [
        	{ name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2, _id: '1234' },
			{ name: 'recipe 2', description: 'description 2', prepTime: 3, cookTime: 4, _id: '5678' } 
		] };
        recipeService.getWasCalled = true;
        deferred.resolve(result);
        return deferred.promise;
    };

    recipeService.getByIdWasCalled = false;
    recipeService.getByIdArgs = null;
    recipeService.getById = function(id) {
        var deferred = $q.defer();
        var result = { data: { name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2, _id: id } };
        recipeService.getByIdWasCalled = true;
        recipeService.getByIdArgs = id;
        deferred.resolve(result);
        return deferred.promise;
    };

    recipeService.createWasCalled = false;
    recipeService.createArgs = null;
    recipeService.create = function(data) {
        var deferred = $q.defer();
    	data._id = '2345';
        recipeService.createWasCalled = true;
        recipeService.createArgs = data;
        deferred.resolve({ data: data });
    	return deferred.promise;
    };

    recipeService.updateWasCalled = false;
    recipeService.updateArgs = null;
    recipeService.update = function(data) {
        var deferred = $q.defer();
        recipeService.updateWasCalled = true;
        recipeService.updateArgs = data;
        deferred.resolve({ data: data });
        return deferred.promise;
    };

    recipeService.deleteWasCalled = false;
    recipeService.deleteArgs = null;
    recipeService.delete = function(id) {
        recipeService.deleteWasCalled = true;
        recipeService.deleteArgs = id;
    };

    return recipeService;
  });