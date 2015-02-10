var Ingredient = require('../models/ingredient');
var Recipe = require('../models/recipe');
var Units = require('../models/units');
var log = require('winston');
var async = require('async');

module.exports.controller = function(app) {

    app.get('/api/ingredients', function(req, res) {
        log.info('Request received for GET /api/ingredients');
        Ingredient.find(function(err, ingredients) {
        	if (!err) {
        		res.json(ingredients);
        	} else {
                log.error(err);
                res.sendStatus(500);
        	}
        });
    });

    app.get('/api/ingredients/units', function(req, res) {
        log.info('Request received for GET /api/ingredients/units');
        res.json(Units.ingredientUnits);
    });

    app.post('/api/ingredients', function(req, res) {
        log.info('Request received for POST /api/ingredients');
    	var ingredient = new Ingredient(req.body);
        ingredient.save(function(err) {
        	if (!err) {
        		res.json(ingredient);
        	} else {
                log.error(err);
        		res.sendStatus(500);
        	}
        }); 
    });

    app.put('/api/ingredients/:id', function(req, res) {
        log.info('Request received for PUT /api/ingredients/' + req.params.id);
        return Ingredient.findById(req.params.id, function(err, ingredient) {
            ingredient.name = req.body.name;
            return ingredient.save(function(err) {
              if (!err) {
                res.json(ingredient);
              } else {
                log.error(err);
                res.sendStatus(500);
              }
            });
        });
    });

    app.delete('/api/ingredients/:id', function(req, res) {
        var ingredientId = req.params.id;
        log.info('Request received for DELETE /api/ingredients/' + ingredientId);
        Recipe.count({ 'ingredients.item' : ingredientId }) //todo: this line is incorrect.
        .exec(function (err, count) {
            if (err) {
                log.error(err);
                res.sendStatus(500);
            }

            if (count > 0) {
                log.warn("Request rejected to delete ingredient because this ingredient is referenced by " + count + " recipes.")
                res.sendStatus(409);
            } else {
                Ingredient.findById(ingredientId).remove(function(err) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        log.error(err);
                        res.sendStatus(500);
                    } 
                });
            }
        });        
    });
}