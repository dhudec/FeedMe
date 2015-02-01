angular.module('common').directive('fmSyncFocusWith', function($timeout, $rootScope) {
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
      })
    }
  }
});