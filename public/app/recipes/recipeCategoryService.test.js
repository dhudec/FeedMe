describe('public.services.recipeCategoryService', function () {
  var recipeCategoryService,
      httpBackend;
  
  beforeEach(function (){  
    module('recipes.services');
    
    inject(function($httpBackend, _recipeCategoryService_) {
      recipeCategoryService = _recipeCategoryService_;      
      httpBackend = $httpBackend;
    });
  });
  
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
 
  describe('get', function(done) {
    it('should call get on the expected url and return the response', function () {
      var responseData = [ { _id: 'a8b9ada8b9ada8b9ada8b9ad', name: 'category 1' }, { _id: 'a9b9ada8b9ada8b9ada8b9ad', name: 'category 2' } ];
      httpBackend.expectGET('/api/recipeCategories').respond(200, responseData);
      
      var returnedPromise = recipeCategoryService.get();
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
      var requestData = { name: 'category 1' }
      var responseData = { name: 'category 1', _id: 'a8b9ada8b9ada8b9ada8b9ad' };
      httpBackend.expectPOST('/api/recipeCategories', requestData).respond(200, responseData);
      
      var returnedPromise = recipeCategoryService.create(requestData);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      
      httpBackend.flush();
      
      expect(result.status).to.eql(200);
      expect(result.data).to.eql(responseData);
    });  
  });
 
  describe('update', function(done) {
    it('should call put on the expected url, passing the parameter and returning the response', function () {
      var requestData = { name: 'category 1', _id: 'a8b9ada8b9ada8b9ada8b9ad' }
      var responseData = requestData;
      httpBackend.expectPUT('/api/recipeCategories/a8b9ada8b9ada8b9ada8b9ad', requestData).respond(200, responseData);
      
      var returnedPromise = recipeCategoryService.update(requestData._id, requestData);
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
      httpBackend.expectDELETE('/api/recipeCategories/' + id).respond(200);
      
      var returnedPromise = recipeCategoryService.delete(id);
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