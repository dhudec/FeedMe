angular.module('toastr.mock').factory('toastr', function() {
    var toastr = {};

    toastr.infoWasCalled = false;
    toastr.info = function(msg) {
		toastr.infoWasCalled = true;
    };

    toastr.successWasCalled = false;
    toastr.success = function(msg) {
        toastr.successWasCalled = true;
    };

    toastr.warningWasCalled = false;
    toastr.warning = function(msg) {
        toastr.warningWasCalled = true;
    };

    toastr.errorWasCalled = false;
    toastr.error = function(msg) {
        toastr.errorWasCalled = true;
    };
    
    return toastr;
  });