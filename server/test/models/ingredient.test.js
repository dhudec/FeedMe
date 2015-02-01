require('../../../config/test.js');
var mongoose = require('mongoose');
var assert = require('chai');
var expect = assert.expect;

var mockgoose = require('mockgoose');
mockgoose(mongoose);

var Ingredient = require('../../models/ingredient');

describe('server.models.Ingredient', function(){
  it('should throw error when missing name', function(done){
    var ingredient = new Ingredient({});
    ingredient.save(function(err) {
    	expect(err).to.not.be.a('null');
    	done();
    })
  });

  it('should throw error when name is empty', function(done){
    var ingredient = new Ingredient({ name: '' });
    ingredient.save(function(err) {
    	expect(err).to.not.be.a('null');
    	done();
    })
  });

  it('should be able to save and find ingredients', function(done){
    mockgoose.reset();
    var ingredient = { name: 'Steak' };
    var ingredientModel = new Ingredient(ingredient);

    ingredientModel.save(function(err) {
    	expect(err).to.be.a('null');

      Ingredient.find(function(err, ingredients) {
        expect(err).to.be.a('null');
        expect(ingredients.length).to.equal(1);

        var firstingredient = ingredients[0];
        expect(firstingredient.name).to.equal(ingredient.name);
        done();
      });
    });
  });

  it('should be able to save multiple ingredients', function(done){
    mockgoose.reset();
    var ingredient1 = { name: 'Steak' };
    var ingredientModel1 = new Ingredient(ingredient1);
    var ingredient2 = { name: 'Chicken Breast' };
    var ingredientModel2 = new Ingredient(ingredient2);

    Ingredient.create([ ingredientModel1, ingredientModel2 ], function(err) {
      expect(err).to.be.a('null');

      Ingredient.find(function(err, ingredients) {
        expect(err).to.be.a('null');
        expect(ingredients.length).to.equal(2);
        done();
      });
    });
  });

  it('should be able to update ingredients', function(done){
    mockgoose.reset();
    var ingredient = { name: 'Steak' };
    var ingredientModel = new Ingredient(ingredient);

    ingredientModel.save(function(err) {
      expect(err).to.be.a('null');

      Ingredient.find(function(err, ingredients) {
        expect(err).to.be.a('null');
        expect(ingredients.length).to.equal(1);

        var firstingredient = ingredients[0];
        expect(firstingredient.name).to.equal(ingredient.name);
        done();
      });
    });
  });

  it('should be able to delete ingredients', function(done){
    mockgoose.reset();
    var ingredient = { name: 'Steak' };
    var ingredientModel = new Ingredient(ingredient);

    ingredientModel.save(function(err) {
      expect(err).to.be.a('null');

      Ingredient.find(function(err, ingredients) {
        expect(err).to.be.a('null');
        expect(ingredients.length).to.equal(1);

        var firstingredient = ingredients[0];
        firstingredient.remove(function(err) {
          expect(err).to.be.a('null');

          Ingredient.find(function(err, ingredients) {
            expect(err).to.be.a('null');
            expect(ingredients.length).to.equal(0);
            done();
          });
        })
      });
    });
  });
});