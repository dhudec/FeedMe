var Ingredient = require('../models/ingredient');
var Recipe = require('../models/recipe');
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
        console.log(ingredientId);
        log.info('Request received for DELETE /api/ingredients/' + ingredientId);
        Recipe.count({ 'ingredients.item' : { $in : [ingredientId] } }) //todo: this line is incorrect.
        .exec(function (err, ingredients) {
            console.log(ingredients);
            if (err) {
                log.error(err);
                res.sendStatus(500);
            }

            if (ingredients > 0) {
                log.warning("Request rejected to delete ingredient because this ingredient is referenced by " + ingredients + " recipes.")
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