require('../../../config/test.js');
var assert = require("chai").assert;
var expect = require("chai").expect;
var request = require('supertest');
var mongoose = require('mongoose');

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var server = require('../../server.js');
var Recipe = require('../../models/recipe');
var RecipeCategory = require('../../models/recipeCategory');

var testCategory = { name: 'Sides' };
var insertedCategory;

describe('server.controllers.recipeCategories', function(done) {
  describe('POST /api/recipeCategories', function(){
    it('should respond to bad request with 500 status', function(done){
      request(server)
      .post('/api/recipeCategories')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and json with _id', function(done){
      request(server)
      .post('/api/recipeCategories')
      .send(testCategory)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        insertedCategory = res.body;
        assert.equal(testCategory.name, insertedCategory.name);
        assert.isTrue(insertedCategory._id != null);
        done();
      });
    });
  });

  describe('GET /api/recipeCategories', function(){
    it('should respond with 200 status', function(done){
      request(server)
      .get('/api/recipeCategories')
      .expect(200, done);
    });

    it('should respond with json recipe categories', function(done){
      request(server)
      .get('/api/recipeCategories')
      .end(function (err, res) {
        if (err)
          console.log(err);

        assert.isTrue(res.body.length == 1);
        assert.equal(insertedCategory._id, res.body[0]._id);
        assert.equal(insertedCategory.name, res.body[0].name);
        done();
      });
    });
  });  

  describe('PUT /api/recipecategories/id', function(){
    it('should respond to bad request with 500 status', function(done){
      request(server)
      .put('/api/recipecategories/123')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and updated json', function(done){
      insertedCategory.name = 'new name';
      
      request(server)
      .put('/api/recipecategories/' + insertedCategory._id)
      .send(insertedCategory)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        // check the response of the put request
        assert.equal(insertedCategory.name, res.body.name);
        done();
      });
    });
  });

  describe('DELETE /api/recipecategories/id', function(){
    it('should respond to bad request with 500 status', function(done){
      request(server)
      .put('/api/recipecategories/123')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and remove the category', function(done){
      RecipeCategory.find(function(err, categories) {
        expect(categories.length).to.equal(1);
        request(server)
        .delete('/api/recipecategories/' + insertedCategory._id)
        .expect(200)
        .end(function (err, res) {
        if (err) return done(err);

          RecipeCategory.find(function(err, categories) {
            expect(categories.length).to.equal(0);
            done();
          });
        });
      });      
    });
  });

  describe('Relationship between category and recipe', function() {
    var chickenCategory,
        dinnerCategory,
        reicpe1,
        recipe2;

    before(function() {
      mockgoose.reset();
      RecipeCategory.create([ { name: 'Chicken' }, { name: 'Dinner' }], function(err, _chickenCategory_, _dinnerCategory_) {
        chickenCategory = _chickenCategory_;
        dinnerCategory = _dinnerCategory_;
        var recipeJson1 = { name: 'My Recipe 1', categories: [ chickenCategory._id, dinnerCategory._id ]};
        var recipeModel1 = new Recipe(recipeJson1);
        recipeModel1.save(function(err, recipe) {
          recipe1 = recipe;
        });
        var recipeJson2 = { name: 'My Recipe 2', categories: [ dinnerCategory._id ]};
        var recipeModel2 = new Recipe(recipeJson2);
        recipeModel2.save(function(err, recipe) {
          recipe2 = recipe;
        });
      });
    });

    it('DELETE should update all recipes and remove references to the deleted category', function(done) {
      request(server)
      .delete('/api/recipecategories/' + dinnerCategory._id)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        Recipe.findById(recipe1._id)
        .populate('categories')
        .exec(function(err, _recipe1_) {
          expect(err).to.equal(null);
          expect(_recipe1_.categories.length).to.equal(1);
          expect(_recipe1_.categories[0]._id).to.eql(chickenCategory._id);
          expect(_recipe1_.categories[0].name).to.equal(chickenCategory.name);

          Recipe.findById(recipe2._id, function (err, _recipe2_) {
            expect(err).to.equal(null);
            expect(_recipe2_.categories.length).to.equal(0);
            done();
          });
        });
      });
    });
  });
});