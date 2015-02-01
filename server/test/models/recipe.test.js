require('../../../config/test.js');
var mongoose = require('mongoose');
var assert = require('chai');
var expect = assert.expect;

var mockgoose = require('mockgoose');
mockgoose(mongoose);

var Recipe = require('../../models/recipe');

describe('server.models.Recipe', function(){
  it('should throw error when missing name', function(done){
    var recipe = new Recipe({});
    recipe.save(function(err) {
    	expect(err).to.not.be.a('null');
    	done();
    })
  });

  it('should throw error when name is empty', function(done){
    var recipe = new Recipe({ name: '' });
    recipe.save(function(err) {
    	expect(err).to.not.be.a('null');
    	done();
    })
  });

  it('should throw error when saving an ingredient with an invalid unit', function(done){
    var recipe = new Recipe({ name: 'My Recipe', ingredients: [ { item: new mongoose.Types.ObjectId(), quantity: 1, units: 'metricfuckton' }] });
    recipe.save(function(err) {
      expect(err).to.not.be.a('null');
      done();
    })
  });

  it('should be able to save an ingredient with a valid unit', function(done){
    var recipe = new Recipe({ name: 'My Recipe', ingredients: [ { item: new mongoose.Types.ObjectId(), quantity: 1, units: 'lb' }] });
    recipe.save(function(err) {
      expect(err).to.be.a('null');
      done();
    })
  });

  it('should be able to save and find a recipe without a category', function(done) {
    mockgoose.reset();
    var recipe = { name: 'Waffles', description: 'Crispy Belgian Waffles', prepTime: 5, cookTime: 15 }
    var recipeModel = new Recipe(recipe);
    recipeModel.save(function(err) {
    	expect(err).to.be.a('null');

      Recipe.find(function(err, recipes) {        
        expect(err).to.be.a('null');
        expect(recipes.length).to.equal(1);

        var firstRecipe = recipes[0];
        expect(firstRecipe.name).to.equal(recipe.name);
        expect(firstRecipe.description).to.equal(recipe.description);
        expect(firstRecipe.prepTime).to.equal(recipe.prepTime);
        expect(firstRecipe.cookTime).to.equal(recipe.cookTime);
        done();
      });
    });
  });

  it('should be able to save and find a recipe with multiple categories', function(done) {
    mockgoose.reset();
    var recipe = { name: 'Waffles', description: 'Crispy Belgian Waffles', prepTime: 5, cookTime: 15, categories: [ mongoose.Types.ObjectId(), mongoose.Types.ObjectId() ] }
    var recipeModel = new Recipe(recipe);
    recipeModel.save(function(err) {
      expect(err).to.be.a('null');

      Recipe.find(function(err, recipes) {        
        expect(err).to.be.a('null');
        expect(recipes.length).to.equal(1);

        var firstRecipe = recipes[0];
        expect(firstRecipe.categories).to.not.be.a('null');
        expect(firstRecipe.categories.length).to.equal(2);
        done();
      });
    });
  });

  it('should be able to delete a recipe', function(done) {
    mockgoose.reset();
    var recipe = { name: 'Waffles', description: 'Crispy Belgian Waffles', prepTime: 5, cookTime: 15, categories: [ mongoose.Types.ObjectId(), mongoose.Types.ObjectId() ] }
    var recipeModel = new Recipe(recipe);
    recipeModel.save(function(err) {
      expect(err).to.be.a('null');

      Recipe.find(function(err, recipes) {        
        expect(err).to.be.a('null');
        expect(recipes.length).to.equal(1);

        var firstRecipe = recipes[0];
        firstRecipe.remove(function(err) {    
          expect(err).to.be.a('null');
          Recipe.find(function(err, recipes) {    
            expect(err).to.be.a('null');
            expect(recipes.length).to.equal(0);
            done();
          });
        });
      });
    });
  });
});