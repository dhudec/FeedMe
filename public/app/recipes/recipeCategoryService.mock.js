angular.module('recipes.mock').factory('recipeCategoryService', function() {
    var recipeCategoryService = {};

    recipeCategoryService.get = function() {
		return {
			success: function (callback) {
				var data =  [
		        	{ name: 'Beef', _id: '1234' },
					{ name: 'Chicken', _id: '5678' },
                    { name: 'Dinner', _id: '2345' } 
				];
				callback(data);
			}
		}        
    };

    recipeCategoryService.createWasCalled = false;
    recipeCategoryService.create = function(data) {
        recipeCategoryService.createWasCalled = true;
    	data._id = '3456';
    	return data;
    };

    recipeCategoryService.updateWasCalled = false;
    recipeCategoryService.update = function(data) {
        recipeCategoryService.updateWasCalled = true;
        return data;
    }

    recipeCategoryService.deleteWasCalled = false;
    recipeCategoryService.delete = function(id) {
        recipeCategoryService.deleteWasCalled = true;
    };

    recipeCategoryService.mock = true;
    
    return recipeCategoryService;
  });