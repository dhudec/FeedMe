describe('public.services.recipeService', function () {
  var recipeService,
      $rootScope,
      httpBackend;
  
  beforeEach(function (){  
    module('recipes.services');
    
    inject(function($httpBackend, _$rootScope_, _recipeService_) {
      recipeService = _recipeService_;
      $rootScope = _$rootScope_;      
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
      for (var i = 0; i < result.data.length; i++) {
        var expected = responseData[i];
        var actual = result.data[i];
        expect(expected.name).to.equal(actual.name);
        expect(expected.description).to.equal(actual.description);
        expect(expected.prepTime).to.equal(actual.prepTime);
        expect(expected.cookTime).to.equal(actual.cookTime);
      }
    });  

    it('should call add the totalTime() function to each recipe', function () {
      var responseData = [ { name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2 }, { name: 'category 2', description: 'description 2', prepTime: 2, cookTime: 3 } ];
      httpBackend.expectGET('/api/recipes').respond(200, responseData);
      
      var returnedPromise = recipeService.get();
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });

      httpBackend.flush();

      expect(result.data[0].totalTime()).to.equal(3);
      expect(result.data[1].totalTime()).to.equal(5);
    });  
  });
 
  describe('getById', function(done) {
    it('should call getById on the expected url and return the response', function () {
      var id = 'abcdef';
      var responseData = { name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2, _id: id };
      httpBackend.expectGET('/api/recipes/' + id).respond(200, responseData);
      
      var returnedPromise = recipeService.getById(id);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      
      httpBackend.flush();
      
      expect(result.status).to.eql(200);
      var expected = responseData;
      var actual = result.data;
      expect(expected.name).to.equal(actual.name);
      expect(expected.description).to.equal(actual.description);
      expect(expected.prepTime).to.equal(actual.prepTime);
      expect(expected.cookTime).to.equal(actual.cookTime);
    });  

    it('should add the totalTime() function to the recipe', function () {
      var id = 'abcdef';
      var responseData = { name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 2, _id: id };
      httpBackend.expectGET('/api/recipes/' + id).respond(200, responseData);
      
      var returnedPromise = recipeService.getById(id);
      var result;
      returnedPromise.then(function(response) {
        result = response;
      });
      
      httpBackend.flush();
      
      expect(result.data.totalTime()).to.equal(3);
    });  
  });
 
  describe('create', function(done) {
    it('should call post on the expected url, passing the parameter and returning the response', function () {
      var requestData = { name: 'recipe 1', description: 'description 1', prepTime: 1, cookTime: 200 }
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