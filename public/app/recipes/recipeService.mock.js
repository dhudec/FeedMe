angular.module('recipes.mock').factory('recipeService', function() {
    var recipeService = {};

    recipeService.get = function() {
		return {
			success: function (callback) {
				var data =  [
		        	{ name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2, _id: '1234' },
					{ name: 'recipe 2', description: 'description 2', prepTime: 3, cookTime: 4, _id: '5678' } 
				];
				callback(data);
			}
		}        
    };

    recipeService.create = function(recipeData) {
    	recipeData._id = '2345';
    	return recipeData;
    };

    recipeService.delete = function(id) {
    };
    
    return recipeService;
  });