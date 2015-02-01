require('../../../config/test.js');
var assert = require("chai").assert;
var expect = require("chai").expect;
var request = require('supertest');
var mongoose = require('mongoose');

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var server = require('../../server.js');
var Ingredient = require('../../models/ingredient');
var Recipe = require('../../models/recipe');

var testIngredient = { name: 'Sides' };
var insertedIngredient;

describe('server.controllers.ingredients', function(done) {
  describe('POST /api/ingredients', function(){
    it('should respond to bad request with 500 status', function(done){
      request(server)
      .post('/api/ingredients')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and json with _id', function(done){
      request(server)
      .post('/api/ingredients')
      .send(testIngredient)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        insertedIngredient = res.body;
        assert.equal(testIngredient.name, insertedIngredient.name);
        assert.isTrue(insertedIngredient._id != null);
        done();
      });
    });
  });

  describe('GET /api/ingredients', function(){
    it('should respond with 200 status', function(done){
      request(server)
      .get('/api/ingredients')
      .expect(200, done);
    });

    it('should respond with json ingredients', function(done){
      request(server)
      .get('/api/ingredients')
      .end(function (err, res) {
        if (err)
          console.log(err);

        assert.isTrue(res.body.length == 1);
        assert.equal(insertedIngredient._id, res.body[0]._id);
        assert.equal(insertedIngredient.name, res.body[0].name);
        done();
      });
    });
  });  

  describe('PUT /api/ingredients/id', function(){
    it('should respond to bad request with 500 status', function(done){
      request(server)
      .put('/api/ingredients/123')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and updated json', function(done){
      insertedIngredient.name = 'new name';
      
      request(server)
      .put('/api/ingredients/' + insertedIngredient._id)
      .send(insertedIngredient)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        // check the response of the put request
        assert.equal(insertedIngredient.name, res.body.name);
        done();
      });
    });
  });

  describe('DELETE /api/ingredients/id', function(){
    it('should respond to bad request with 500 status', function(done){
      request(server)
      .put('/api/ingredients/123')
      .send({})
      .expect(500, done);
    });

    it('should respond with 200 status and remove the ingredient', function(done){
      Ingredient.find(function(err, categories) {
        expect(categories.length).to.equal(1);
        request(server)
        .delete('/api/ingredients/' + insertedIngredient._id)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          Ingredient.find(function(err, categories) {
            expect(categories.length).to.equal(0);
            done();
          });
        });
      });      
    });
  });

  describe('Relationship between ingredient and recipe', function() {
    var chickenIngredient,
        parsleyIngredient,
        reicpe;

    before(function() {
      mockgoose.reset();
      Ingredient.create([ { name: 'Chicken Breast' }, { name: 'parsley' }], function(err, _chickenIngredient_, _parsleyIngredient_) {
        chickenIngredient = _chickenIngredient_;
        parsleyIngredient = _parsleyIngredient_;
        var recipeJson = { name: 'My Recipe', ingredients: [ { item: chickenIngredient, quantity: 1, units: 'lb' } ] };
        var recipeModel = new Recipe(recipeJson);
        recipeModel.save(function(err, recipe) {
          recipe = recipe;
        });
      });
    });

    it('DELETE should return a 200 status when deleting an ingredient not used by any recipes', function(done) {
      request(server)
      .delete('/api/ingredients/' + parsleyIngredient._id)
      .expect(200)
      .end(function (err, res) {
        console.log(err);
        expect(err).not.to.be.a('null');
        Ingredient.find(function(err, ingredients) {
          if (err) return done(err);
          expect(ingredients.length).to.equal(2);
          done();
        });
      });
    });

    it('DELETE should return a 409 error when deleting an ingredient used by at least one existing recipe', function(done) {
      request(server)
      .delete('/api/ingredients/' + chickenIngredient._id)
      .expect(409)
      .end(function (err, res) {
          if (err) return done(err);
          Ingredient.find(function(err, ingredients) {
            expect(err).to.be.a('null');
            expect(ingredients.length).to.equal(1);
            done();
          });
      });
    });
  });
});