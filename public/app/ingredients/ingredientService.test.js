describe('public.app.ingredients.ingredientService', function () {
  var ingredientService,
      httpBackend;
  
  beforeEach(function (){  
    module('ingredients.services');
    
    inject(function($httpBackend, _ingredientService_) {
      ingredientService = _ingredientService_;      
      httpBackend = $httpBackend;
    });
  });
  
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
 
  describe('getUnits', function(done) {
    it('should call get on the expected url and return the response', function () {
      var responseData = [ 'lb', 'oz' ];
      httpBackend.expectGET('/api/ingredients/units').respond(200, responseData);
      
      var returnedPromise = ingredientService.getUnits();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      
      httpBackend.flush();
      
      expect(result.status).to.eql(200);
      expect(result.data).to.eql(responseData);
    });  
  });
});