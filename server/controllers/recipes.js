var Recipe = require('../models/recipe');
var log = require('winston');

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
    	var recipe = new Recipe(req.body);
        recipe.save(function(err) {
        	if (!err) {
        		res.json(recipe);
        	} else {
                log.error(err);
        		res.sendStatus(500);
        	}
        });
    });

    app.put('/api/recipes/:id', function(req, res) {
        log.info('Request received for PUT /api/recipes/' + req.params.id);
        return Recipe.findById(req.params.id, function(err, recipe) {
            recipe.name = req.body.name;
            recipe.description = req.body.description;
            recipe.prepTime = req.body.prepTime;
            recipe.cookTime = req.body.cookTime;
            recipe.categories = req.body.categories;

            return recipe.save(function(err) {
              if (!err) {
                res.json(recipe);
              } else {
                log.error(err);
                res.sendStatus(500);
              }
            });
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
}