describe('public.services.recipeService', function () {
  var recipeService,
      httpBackend;
  
  beforeEach(function (){  
    module('recipes');
    
    inject(function($httpBackend, _recipeService_) {
      recipeService = _recipeService_;      
      httpBackend = $httpBackend;
    });
  });
  
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
 
  describe('get', function(done) {
    it('should call get on the expected url and return the response', function () {
      var responseData = [ { name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2 }, { name: 'category 2', description: 'description 2', prepTime: 2, cookTime: 3 } ];
      httpBackend.expectGET('/api/recipes').respond(200, responseData);
      
      var returnedPromise = recipeService.get();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      
      httpBackend.flush();
      
      expect(result.status).to.eql(200);
      expect(result.data).to.eql(responseData);
    });  
  });
 
  describe('create', function(done) {
    it('should call post on the expected url, passing the parameter and returning the response', function () {
      var requestData = { name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2 }
      var responseData = { name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2, _id: '1234567890' }
      
      httpBackend.expectPOST('/api/recipes', requestData).respond(200, responseData);
      
      var returnedPromise = recipeService.create(requestData);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      
      httpBackend.flush();
      
      expect(result.status).to.eql(200);
      expect(result.data).to.eql(responseData);
    });  
  });
 
  describe('delete', function(done) {
    it('should call delete on the expected url', function () {
      var id = 'af8329af8329af8329af8329';
      httpBackend.expectDELETE('/api/recipes/' + id).respond(200);
      
      var returnedPromise = recipeService.delete(id);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      
      httpBackend.flush();
      
      expect(result.status).to.eql(200);
      expect(result.data).to.be.a('undefined');
    });  
  });
});