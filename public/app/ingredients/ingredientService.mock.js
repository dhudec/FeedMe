angular.module('ingredients.mock').factory('ingredientService', function($q) {
    var service = {};

    service.getUnits = function() {
        var deferred = $q.defer();
        deferred.resolve({ data: ['lb', 'oz', 'c', 'tsp', 'tbsp'] });
        return deferred.promise;
    };

    return service;
  });