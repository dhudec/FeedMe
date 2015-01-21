var assert = require("chai").assert;
var expect = assert.expect;
var request = require('supertest');
var mongoose = require('mongoose');
var log = require('winston'); 

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var server = require('../../server.js');

var testRecipeWithoutCategories = { name: 'My Recipe', categories: null };
var testRecipeWithCategories = { name: 'My Recipe', categories: [ mongoose.Types.ObjectId(), mongoose.Types.ObjectId() ] };
var insertedRecipe;

describe('server.controllers.recipes', function(done) {
  describe('POST /api/recipes', function(){
    it('should respond to bad request with 500 status', function(done) {
      request(server)
      .post('/api/recipes')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and json with _id', function(done) {
      request(server)
      .post('/api/recipes')
      .send(testRecipeWithoutCategories)
      .expect(200)
      .end(function (err, res) {
        if (err)
          console.log(err);

        insertedRecipe = res.body;
        assert.equal(testRecipeWithoutCategories.name, insertedRecipe.name);
        assert.equal(testRecipeWithoutCategories.categories, insertedRecipe.categories);
        assert.isTrue(insertedRecipe._id != null);
        done();
      });
    });
  });

  describe('GET /api/recipes', function() {
    it('should respond with 200 status', function(done) {
      request(server)
      .get('/api/recipes')
      .expect(200, done);
    });

    it('should respond with json recipes', function(done) {
      request(server)
      .get('/api/recipes')
      .end(function (err, res) {
        if (err)
          console.log(err);

        assert.isTrue(res.body.length == 1);
        assert.equal(insertedRecipe._id, res.body[0]._id);
        assert.equal(insertedRecipe.name, res.body[0].name);
        assert.equal(insertedRecipe.categories, res.body[0].categories);
        done();
      });
    });
  });

  describe('PUT /api/recipes/id', function(){
    it('should respond to bad request with 500 status', function(done) {
      request(server)
      .put('/api/recipes/123')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and updated json', function(done) {
      var updatedRecipe = insertedRecipe;
      updatedRecipe.name = 'new name';
      updatedRecipe.description = 'new description';
      updatedRecipe.prepTime = 12;
      updatedRecipe.cookTime = 24;
      updatedRecipe.categories = [ mongoose.Types.ObjectId(), mongoose.Types.ObjectId(), , mongoose.Types.ObjectId() ];
      
      request(server)
      .put('/api/recipes/' + updatedRecipe._id)
      .send(updatedRecipe)
      .expect(200)
      .end(function (err, res) {
        if (err)
          return console.log(err);

        assert.equal(updatedRecipe.name, res.body.name);
        assert.equal(updatedRecipe.description, res.body.description);
        assert.equal(updatedRecipe.prepTime, res.body.prepTime);
        assert.equal(updatedRecipe.cookTime, res.body.cookTime);
        //assert.equal(updatedRecipe.categories, res.body.categories);
        done();
      });
    });
  });
});