require('../../../config/test.js');
var assert = require('chai');
var expect = assert.expect;

var Units = require('../../models/units');

describe('server.models.Units.ingredientUnits', function(){
  it('should return an array of unit system strings', function(done){
    expect(Units.ingredientUnits).to.be.an('array');
    expect(Units.ingredientUnits[0]).to.equal('lb');
    done();
  });
});