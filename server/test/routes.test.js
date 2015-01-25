require('../../config/test.js');
var assert = require("chai").assert;
var request = require('supertest');

var server = require('../../server/server.js');

describe('GET /', function(){
  it('responds with html', function(done){
    request(server)
      .get('/')
      .expect(200)
      .end(function (err, res) {
            assert.isTrue(res.text.indexOf("</html>") > 0);
            done();
      });
  })
})