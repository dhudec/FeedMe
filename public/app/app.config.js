angular.module('feedMe').config(function(toastrConfig) {
  angular.extend(toastrConfig, {
  	positionClass: "toast-bottom-right"
  });
});