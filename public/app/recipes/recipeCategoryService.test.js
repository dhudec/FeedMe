describe('public.services.recipeCategoryService', function () {
  var recipeCategoryService,
      httpBackend;
  
  beforeEach(function (){  
    // load the module.
    module('recipes');
    
    // get your service, also get $httpBackend
    // $httpBackend will be a mock, thanks to angular-mocks.js
    inject(function($httpBackend, _recipeCategoryService_) {
      recipeCategoryService = _recipeCategoryService_;      
      httpBackend = $httpBackend;
    });
  });
  
  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
 
  it('should send the msg and return the response.', function (){
    var returnData = [ { name: 'category 1' }, { name: 'category 2' } ];
    
    httpBackend.expectGET('/api/recipeCategories').respond(returnData);
    
    var returnedPromise = recipeCategoryService.get();
    
    // set up a handler for the response, that will put the result into a variable in this scope
    var result;
    returnedPromise.then(function(response) {
      result = response.data;
    });
    
    // flush the backend to "execute" the request to do the expectedGET assertion.
    httpBackend.flush();
    
    expect(result).to.eql(returnData);
  });  
});