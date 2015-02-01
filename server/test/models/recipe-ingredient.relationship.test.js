require('../../../config/test.js');
var mongoose = require('mongoose');
var assert = require('chai').assert;
var expect = require('chai').expect;

var mockgoose = require('mockgoose');
mockgoose(mongoose);

var Recipe = require('../../models/recipe');
var Ingredient = require('../../models/ingredient');

describe('server.models.Recipe - server.models.Ingredient relationship', function() {

  it('should be able to save a recipe with ingredients containing ingredient models', function(done) {
    mockgoose.reset();
    Ingredient.create([ { name: 'Chicken Breast' }, { name: 'Parsley' } ], function(err) {
      expect(err).to.be.a('null');
      var recipe = { name: 'My Recipe', ingredients: [ { item: arguments[1], quantity: 1, units: 'lb' },
                                                       { item: arguments[2], quantity: 3, units: 'tsp' } ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err, savedRecipe) {
        expect(err).to.be.a('null');
        done();
      });
    });
  });

  it('should be able to save a recipe with child ingredients containing ingredient ids', function(done) {
    mockgoose.reset();
    Ingredient.create([ { name: 'Chicken Breast' }, { name: 'Parsley' } ], function(err) {
      expect(err).to.be.a('null');
      var recipe = { name: 'My Recipe', ingredients: [ { item: arguments[1]._id, quantity: 1, units: 'lb' },
                                                       { item: arguments[2]._id, quantity: 3, units: 'tsp' } ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err, savedRecipe) {
        expect(err).to.be.a('null');
        done();
      });
    });
  });

  // expresses why you must pass in only the _id of referenced objects through the REST service, not the full JSON object, even though Mongoose supports this directly
  it('should not be able to save a recipe with ingredient json objects after stringifying and reparsing', function(done) {
    mockgoose.reset();
    Ingredient.create([ { name: 'Chicken Breast' }, { name: 'Parsley' } ], function(err) {
      expect(err).to.be.a('null');
      var recipe = { name: 'My Recipe', ingredients: [ { item: arguments[1], quantity: 1, units: 'lb' },
                                                       { item: arguments[2], quantity: 3, units: 'tsp' } ] };
      var recipeModel = new Recipe(JSON.parse(JSON.stringify(recipe))); // simulates stringification to pass over the wire, and subsequent reparsing by the server
      recipeModel.save(function(err, savedRecipe) {
        expect(err).not.to.be.a('null');
        done();
      });
    });
  });

  it('should be able to retrieve unpopulated child ingredients', function(done) {
    mockgoose.reset();
    Ingredient.create([ { name: 'Chicken Breast' }, { name: 'Parsley' } ], function(err) {
      expect(err).to.be.a('null');
      var savedIngredients = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', ingredients: [ { item: arguments[1], quantity: 1, units: 'lb' },
                                                       { item: arguments[2], quantity: 3, units: 'tsp' } ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err) {
        Recipe.find()
        .exec(function(err, recipes) {
          expect(recipes.length).to.equal(1);
          expect(recipes[0].ingredients.length).to.equal(2);
          for(i = 0; i < recipes[0].ingredients.length; i++) {
            expect(recipes[0].ingredients[i].item._id).to.be.undefined;
            expect(recipes[0].ingredients[i].item.name).to.be.undefined;
            expect(recipes[0].ingredients[i].item).to.eql(savedIngredients[i]._id);
          }
          done();
        });
      });
    });
  });

  it('should be able to retrieve populated child ingredient objects after saving objects', function(done) {
    mockgoose.reset();
    Ingredient.create([ { name: 'Chicken Breast' }, { name: 'Parsley' } ], function(err) {
      expect(err).to.be.a('null');
      var savedIngredients = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', ingredients: [ { item: arguments[1], quantity: 1, units: 'lb' },
                                                       { item: arguments[2], quantity: 3, units: 'tsp' } ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err) {
        Recipe.find()
        .populate('ingredients.item')
        .exec(function(err, recipes) {
          expect(recipes.length).to.equal(1);
          expect(recipes[0].ingredients.length).to.equal(2);
          for (i = 0; i < recipes[0].ingredients.length; i++) {
            expect(recipes[0].ingredients[i].item._id).to.eql(savedIngredients[i]._id);
            expect(recipes[0].ingredients[i].item.name).to.equal(savedIngredients[i].name);
          }
          done();
        });
      });
    });
  });

  it('should be able to retrieve populated child category objects after saving ids', function(done) {
    mockgoose.reset();
    Ingredient.create([ { name: 'Chicken Breast' }, { name: 'Parsley' } ], function(err) {
      expect(err).to.be.a('null');
      var savedIngredients = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', ingredients: [ { item: arguments[1]._id, quantity: 1, units: 'lb' },
                                                       { item: arguments[2]._id, quantity: 3, units: 'tsp' } ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err) {
        Recipe.find()
        .populate('ingredients.item')
        .exec(function(err, recipes) {
          expect(recipes.length).to.equal(1);
          expect(recipes[0].ingredients.length).to.equal(2);
          for (i = 0; i < recipes[0].ingredients.length; i++) {
            expect(recipes[0].ingredients[i].item._id).to.eql(savedIngredients[i]._id);
            expect(recipes[0].ingredients[i].item.name).to.equal(savedIngredients[i].name);
          }
          done();
        });
      });
    });
  });

  it('should be able to find recipes by ingredient', function(done) {
    mockgoose.reset();
    Ingredient.create([ { name: 'Chicken Breast' }, { name: 'Parsley' } ], function(err) {
      expect(err).to.be.a('null');
      var savedIngredients = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', ingredients: [ { item: arguments[1]._id, quantity: 1, units: 'lb' },
                                                       { item: arguments[2]._id, quantity: 3, units: 'tsp' } ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err) {
        Recipe.find({ 'ingredients.item': savedIngredients[0]._id })
        .exec(function(err, recipes) {
          expect(recipes.length).to.equal(1);
          done();
        });
      });
    });
  });
});