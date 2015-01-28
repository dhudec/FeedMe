var assert = require("chai").assert;
var expect = require("chai").expect;
var request = require('supertest');
var mongoose = require('mongoose');
var log = require('winston'); 
require('../../../config/test.js');

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var server = require('../../server.js');
var Recipe = require('../../models/recipe');
var RecipeCategory = require('../../models/recipeCategory');

var chickenCategory,
    dinnerCategory,
    breakfastCategory,
    testRecipe,
    insertedRecipe;

describe('server.controllers.recipes', function(done) {
  before(function() {
    mockgoose.reset();
    RecipeCategory.create([ { name: 'Chicken' }, { name: 'Dinner' }, { name: 'Breakfast' }], function(err, _chickenCategory_, _dinnerCategory_, _breakfastCategory_) {
      chickenCategory = _chickenCategory_;
      dinnerCategory = _dinnerCategory_;
      breakfastCategory = _breakfastCategory_;
      testRecipe = { name: 'My Recipe', categories: [ chickenCategory._id, dinnerCategory._id ] };
    });
  });

  describe('POST /api/recipes', function() {
    it('should respond to bad request with 500 status', function(done) {
      request(server)
      .post('/api/recipes')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and json with _id', function(done) {
      request(server)
      .post('/api/recipes')
      .send(testRecipe)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        insertedRecipe = res.body;
        assert.equal(testRecipe.name, insertedRecipe.name);
        assert.equal(testRecipe.categories.length, insertedRecipe.categories.length);
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
        if (err) return done(err);

        assert.isTrue(res.body.length == 1);
        assert.equal(insertedRecipe._id, res.body[0]._id);
        assert.equal(insertedRecipe.name, res.body[0].name);
        assert.equal(insertedRecipe.categories.length, res.body[0].categories.length);
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
      updatedRecipe.categories = [ breakfastCategory._id ];
      
      request(server)
      .put('/api/recipes/' + updatedRecipe._id)
      .send(updatedRecipe)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        assert.equal(updatedRecipe.name, res.body.name);
        assert.equal(updatedRecipe.description, res.body.description);
        assert.equal(updatedRecipe.prepTime, res.body.prepTime);
        assert.equal(updatedRecipe.cookTime, res.body.cookTime);
        expect(updatedRecipe.cookTime).to.eql(res.body.cookTime);
        assert.equal(updatedRecipe.categories.length, res.body.categories.length);
        done();
      });
    });
  });

  describe('DELETE /api/recipes/id', function(){
    it('should respond to bad request with 500 status', function(done){
      request(server)
      .put('/api/recipes/123')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and remove the recipe', function(done) {
      Recipe.find(function(err, recipes) {
          expect(recipes.length).to.equal(1);
        request(server)
        .delete('/api/recipes/' + insertedRecipe._id)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          Recipe.find(function(err, recipes) {
            expect(recipes.length).to.equal(0);
            done();
          });
        });
      });
    });
  });

  describe('Relationship between recipe and categories', function(){
    var categories,
        reicpe;

    before(function() {
      mockgoose.reset();
      RecipeCategory.create([ { name: 'Chicken' }, { name: 'Beef' }], function(err, _categories_) {
        categories = [arguments[1], arguments[2]];
        var recipeJson = { name: 'My Recipe', categories: categories};
        var recipeModel = new Recipe(recipeJson);
        recipeModel.save(function(err, _recipe_) {
          recipe = _recipe_;
        });
      });
    });

    it('GET should return populated child category objects', function(done) {
      request(server)
      .get('/api/recipes')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        var recipes = res.body;
        expect(recipes.length).to.equal(1);
        expect(recipes[0].categories.length).to.equal(2);
        for (i = 0; i < recipes[0].categories.length; i++) {
          expect(recipes[0].categories[i]._id).to.equal(categories[i]._id.toString());
          expect(recipes[0].categories[i].name).to.equal(categories[i].name);
        }
        done();
      });
    });

    it('DELETE should not remove related categories', function(done) {
      request(server)
      .delete('/api/recipes/' + recipe._id)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        RecipeCategory.find(function(err, categories) {
          expect(categories.length).to.equal(2);
          done();
        });
      });
    });
  });
});