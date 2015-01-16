var assert = require("chai").assert;
var request = require('supertest');
var express = require('express');

var app = require('../server.js');

describe('GET /', function(){
  it('responds with html', function(done){
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
            assert.isTrue(res.text.indexOf("</html>") > 0);
            done();
      });
  })
})

/*describe('GET', function(){
  it('respond with json', function(done){
    request(app)
    .get('/insecticons.json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  })
})*/