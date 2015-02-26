var common = angular.module('common')

common.directive('fmSyncFocusWith', function($timeout, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      focusValue: "=fmSyncFocusWith"
    },
    link: function($scope, $element, attrs) {
      $scope.$watch("focusValue", function(currentValue, previousValue) {
        if (currentValue === true) {// && !previousValue) {
          $element[0].focus();
        } else if (currentValue === false) { // && previousValue) {
          $element[0].blur();
        }
      });
    }
  }
});

common.directive('fmRecipeImg', function() {
  return {
   restrict: "A",
    link: function($scope, $element, attrs) {
      attrs.$observe('fmRecipeImg', function(val) {
        $element.attr('src', val || "/assets/data/default-recipe.png");
      });
    }
  }
});