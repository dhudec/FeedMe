var assert = require("chai").assert;
var request = require('supertest');
var mongoose = require('mongoose');
var log = require('winston'); 

// mock the database
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var server = require('../../../server/server.js');

var testRecipe = { name: 'My Recipe' };
var insertedRecipe;

describe('POST /api/recipes', function(){
  it('should respond to bad request with 500 status', function(done){
    request(server)
    .post('/api/recipes')
    .send({})
    .expect(500, done);
  });

  it('should respond with 200 status and json with _id', function(done){
    request(server)
    .post('/api/recipes')
    .send(testRecipe)
    .expect(200)
    .end(function (err, res) {
      insertedRecipe = res.body;
      assert.equal(testRecipe.name, insertedRecipe.name);
      assert.isTrue(insertedRecipe._id != null);
      done();
    });
  });
});

describe('GET /api/recipes', function(){
  it('should respond with 200 status', function(done){
    request(server)
    .get('/api/recipes')
    .expect(200, done);
  });

  it('should respond with json recipes', function(done){
    request(server)
    .get('/api/recipes')
    .end(function (err, res) {
      assert.isTrue(res.body.length == 1);
      assert.equal(insertedRecipe._id, res.body[0]._id);
      assert.equal(insertedRecipe.name, res.body[0].name);
      done();
    });
  });
});