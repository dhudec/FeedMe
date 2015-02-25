var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient');
var log = require('winston');
var async = require('async');
var q = require('q');

module.exports.controller = function(app) {

    app.get('/api/recipes', function(req, res) {
        log.info('Request received for GET /api/recipes');
        Recipe.find()
        .populate('categories')
        .populate('ingredients.item')
        .exec(function(err, recipes) {
        	if (!err) {
        		res.json(recipes);
        	} else {
                log.error(err);
                res.sendStatus(500);
        	}
        });
    });

    app.get('/api/recipes/:id', function(req, res) {
        log.info('Request received for GET /api/recipes/' + req.params.id);
        return Recipe.findById(req.params.id)
        .populate('categories')
        .populate('ingredients.item')
        .exec(function (err, recipe) {
        	if (!err) {
        		res.json(recipe);
        	} else {
                log.error(err);
                res.sendStatus(500);
        	}
        });
    });

    app.post('/api/recipes', function(req, res) {
        log.info('Request received for POST /api/recipes');
        var recipe = req.body;

        flattenCategoryReferences(recipe);

        resolveIngredientReferences(recipe).then(function(recipe) {
            var recipeModel = new Recipe(recipe);
            recipeModel.save(function(err) {
                if (!err) {
                    res.json(recipeModel);
                } else {
                    log.error(err);
                    res.sendStatus(500);
                }
            });
        }, function (err) {
            log.error(err);
            res.sendStatus(500);
        });    	
    });

    app.put('/api/recipes/:id', function(req, res) {
        log.info('Request received for PUT /api/recipes/' + req.params.id);
        var recipe = req.body;
        if (recipe._id !== req.params.id)
            return res.sendStatus(400);

        flattenCategoryReferences(recipe);

        resolveIngredientReferences(recipe).then(function(recipe) {
            return Recipe.update({_id: recipe._id}, recipe, function(err) {
              if (!err) {
                res.json(recipe);
              } else {
                log.error(err);
                res.sendStatus(500);
              }
            });
        }, function (err) {
            log.error(err);
            res.sendStatus(500);
        }); 
    });

    app.delete('/api/recipes/:id', function(req, res) {
        log.info('Request received for DELETE /api/recipes/' + req.params.id);
        Recipe.findById(req.params.id).remove(function (err) {
            if (!err) {
                res.sendStatus(200);
            } else {
                log.error(err);
                res.sendStatus(500);
            }
        });
    });

    var flattenCategoryReferences = function(recipe) {
        if (typeof(recipe.categories) !== 'undefined') {
            for (var i = 0; i < recipe.categories.length; i++) {
                var category = recipe.categories[i];
                if (typeof category._id !== 'undefined') {
                    recipe.categories[i] = category._id;
                }
            }
        }
    }

    var resolveIngredientReferences = function(recipe) {
        var deferred = q.defer();
        var funcs = [];
        if (typeof(recipe.ingredients) !== 'undefined') {
            recipe.ingredients.forEach(function(ingredient, index) {
                funcs.push(function(callback) {
                    log.debug('Resolving ingredient reference: ' + JSON.stringify(ingredient))
                    Ingredient.findOne({name: ingredient.item.name}, function(err, matchingIngredient) {
                        if (err) callback(err);
                        if (matchingIngredient != null) {
                            recipe.ingredients[index].item = matchingIngredient;
                            callback(null);
                        } else {
                            var ingredientModel = new Ingredient(ingredient.item);
                            ingredientModel.save(function(err, savedIngredient) {
                                if (err) callback(err);
                                recipe.ingredients[index].item = savedIngredient;
                                callback(null);
                            });
                        }
                    });
                });
            });
        }
        async.parallel(funcs, function(err, result) {
            /* this code will run after all calls finished the job or
               when any of the calls passes an error */
            if (err) {
                log.error(err);
                deferred.reject(err);
            }
            deferred.resolve(recipe);
        });

        return deferred.promise;
    }
}