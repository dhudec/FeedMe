angular.module('recipes.mock').factory('recipeCategoryService', function($q) {
    var recipeCategoryService = {};

    recipeCategoryService.get = function() {
        var deferred = $q.defer();
        deferred.resolve({ data: [
        	{ name: 'Beef', _id: '1234' },
			{ name: 'Chicken', _id: '5678' },
            { name: 'Dinner', _id: '2345' } 
		] });
        return deferred.promise;
    };

    recipeCategoryService.createWasCalled = false;
    recipeCategoryService.create = function(data) {
        var deferred = $q.defer();
        recipeCategoryService.createWasCalled = true;
    	data._id = '3456';
        deferred.resolve({ data: data });
    	return deferred.promise;
    };

    recipeCategoryService.updateWasCalled = false;
    recipeCategoryService.update = function(data) {
        var deferred = $q.defer();
        recipeCategoryService.updateWasCalled = true;
        deferred.resolve({ data: data });
        return deferred.promise;
    }

    recipeCategoryService.deleteWasCalled = false;
    recipeCategoryService.delete = function(id) {
        var deferred = $q.defer();
        recipeCategoryService.deleteWasCalled = true;
        deferred.resolve({ });
        return deferred.promise;
    };

    return recipeCategoryService;
  });