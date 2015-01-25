require('../../../config/test.js');
var assert = require("chai").assert;
var expect = assert.expect;
var request = require('supertest');
var mongoose = require('mongoose');

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var server = require('../../server.js');

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
        if (err)
          console.log(err);

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

    it('should respond with 200 status and json with _id', function(done){
      insertedCategory.name = 'new name';
      
      request(server)
      .put('/api/recipecategories/' + insertedCategory._id)
      .send(insertedCategory)
      .expect(200)
      .end(function (err, res) {
        if (err)
          console.log(err);

        // check the response of the put request
        assert.equal(insertedCategory.name, res.body.name);
        done();
      });
    });
  });
});