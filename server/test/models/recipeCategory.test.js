var mongoose = require('mongoose');
var assert = require('chai');
var expect = assert.expect;

var mockgoose = require('mockgoose');
mockgoose(mongoose);

var RecipeCategory = require('../../models/recipeCategory');

describe('server.models.RecipeCategory', function(){
  it('should throw error when missing name', function(done){
    var category = new RecipeCategory({});
    category.save(function(err) {
    	expect(err).to.not.be.a('null');
    	done();
    })
  });

  it('should throw error when name is empty', function(done){
    var category = new RecipeCategory({ name: '' });
    category.save(function(err) {
    	expect(err).to.not.be.a('null');
    	done();
    })
  });

  it('should be able to save and find categories', function(done){
    mockgoose.reset();
    var category = { name: 'Beef' };
    var categoryModel = new RecipeCategory(category);

    categoryModel.save(function(err) {
    	expect(err).to.be.a('null');

      RecipeCategory.find(function(err, categories) {
        expect(err).to.be.a('null');
        expect(categories.length).to.equal(1);

        var firstCategory = categories[0];
        expect(firstCategory.name).to.equal(category.name);
        done();
      });
    });
  });
});