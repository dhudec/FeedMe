require('../../../config/test.js');
var mongoose = require('mongoose');
var assert = require('chai').assert;
var expect = require('chai').expect;

var mockgoose = require('mockgoose');
mockgoose(mongoose);

var Recipe = require('../../models/recipe');
var RecipeCategory = require('../../models/recipeCategory');

describe('server.models.Recipe - server.models.RecipeCategory relationship', function() {

  it('should be able to save a recipe with child category models', function(done) {
    mockgoose.reset();
    RecipeCategory.create([ { name: 'Chicken' }, { name: 'Beef' } ], function(err) {
      expect(err).to.be.a('null');
      var savedCategories = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', categories: savedCategories };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err, savedRecipe) {
        expect(err).to.be.a('null');
        done();
      });
    });
  });

  it('should be able to save a recipe with child category ids', function(done) {
    mockgoose.reset();
    RecipeCategory.create([ { name: 'Chicken' }, { name: 'Beef' } ], function(err) {
      expect(err).to.be.a('null');
      var recipe = { name: 'My Recipe', categories: [ arguments[1]._id, arguments[2]._id ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err, savedRecipe) {
        expect(err).to.be.a('null');
        done();
      });
    });
  });

  // expresses why you must pass in only the _id of child objects through the REST service, not the full JSON object, even though Mongoose supports this directly
  it('should not be able to save a recipe with child category json objects after stringifying and reparsing', function(done) {
    mockgoose.reset();
    RecipeCategory.create([ { name: 'Chicken' }, { name: 'Beef' } ], function(err, chickenCategory, beefCategory) {
      expect(err).to.be.a('null');
      var recipe = { name: 'My Recipe', categories: [ chickenCategory, beefCategory ] };
      var recipeModel = new Recipe(JSON.parse(JSON.stringify(recipe))); // simulates stringification to pass over the wire, and subsequent reparsing by the server
      recipeModel.save(function(err, savedRecipe) {
        expect(err).not.to.be.a('null');
        done();
      });
    });
  });

  it('should be able to retrieve unpopulated child categories', function(done) {
    mockgoose.reset();
    RecipeCategory.create([ new RecipeCategory({ name: 'Chicken' }), new RecipeCategory({ name: 'Beef' }) ], function(err) {
      expect(err).to.be.a('null');
      var savedCategories = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', categories: savedCategories };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err) {
        Recipe.find()
        .exec(function(err, recipes) {
          expect(recipes.length).to.equal(1);
          expect(recipes[0].categories.length).to.equal(2);
          for(i = 0; i < recipes[0].categories.length; i++) {
            expect(recipes[0].categories[i]._id).to.be.undefined;
            expect(recipes[0].categories[i].name).to.be.undefined;
            expect(recipes[0].categories[i]).to.eql(savedCategories[i]._id);
          }
          done();
        });
      });
    });
  });

  it('should be able to retrieve populated child category objects after saving objects', function(done) {
    mockgoose.reset();
    RecipeCategory.create([ new RecipeCategory({ name: 'Chicken' }), new RecipeCategory({ name: 'Beef' }) ], function(err) {
      expect(err).to.be.a('null');
      var savedCategories = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', categories: savedCategories };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err) {
        Recipe.find()
        .populate('categories')
        .exec(function(err, recipes) {
          expect(recipes.length).to.equal(1);
          expect(recipes[0].categories.length).to.equal(2);
          for (i = 0; i < recipes[0].categories.length; i++) {
            expect(recipes[0].categories[i]._id).to.eql(savedCategories[i]._id);
            expect(recipes[0].categories[i].name).to.equal(savedCategories[i].name);
          }
          done();
        });
      });
    });
  });

  it('should be able to retrieve populated child category objects after saving ids', function(done) {
    mockgoose.reset();
    RecipeCategory.create([ new RecipeCategory({ name: 'Chicken' }), new RecipeCategory({ name: 'Beef' }) ], function(err) {
      expect(err).to.be.a('null');
      var savedCategories = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', categories: [ savedCategories[0]._id, savedCategories[1]._id ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err) {
        Recipe.find()
        .populate('categories')
        .exec(function(err, recipes) {
          expect(recipes.length).to.equal(1);
          expect(recipes[0].categories.length).to.equal(2);
          for (i = 0; i < recipes[0].categories.length; i++) {
            expect(recipes[0].categories[i]._id).to.eql(savedCategories[i]._id);
            expect(recipes[0].categories[i].name).to.equal(savedCategories[i].name);
          }
          done();
        });
      });
    });
  });

  it('should be able to find recipes by category', function(done) {
    mockgoose.reset();
    RecipeCategory.create([ new RecipeCategory({ name: 'Chicken' }), new RecipeCategory({ name: 'Beef' }) ], function(err) {
      expect(err).to.be.a('null');
      var savedCategories = [arguments[1], arguments[2]];
      var recipe = { name: 'My Recipe', categories: [ savedCategories[0]._id, savedCategories[1]._id ] };
      var recipeModel = new Recipe(recipe);
      recipeModel.save(function(err) {
        Recipe.find({ 'categories': savedCategories[0]._id })
        .exec(function(err, recipes) {
          expect(recipes.length).to.equal(1);
          done();
        });
      });
    });
  });
});