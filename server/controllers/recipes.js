var Recipe = require('../models/recipe');
var log = require('winston');

module.exports.controller = function(app) {

    app.get('/api/recipes', function(req, res) {
        log.info('Request received for GET /api/recipes');
        Recipe.find(function(err, recipes) {
        	if (!err) {
        		res.json(recipes);
        	} else {
                log.error(err);
                res.sendStatus(500);
        	}
        });
    });

    app.get('/api/recipes/:id', function(req, res) {
        return Recipe.findById(req.params.id, function (err, recipe) {
        	if (!err) {
        		res.json(recipe);
        	} else {
                log.error(err);
                res.sendStatus(500);
        	}
        });
    });

    app.post('/api/recipes', function(req, res) {
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

    app.put('/api/recipes', function(req, res) {
        Recipe.find(function(err, recipes) {
            if (err)
                res.send(err);

            res.json(recipes);
        });
    });

    app.delete('/api/recipes', function(req, res) {
        Recipe.find(function(err, recipes) {
            if (err)
                res.send(err);

            res.json(recipes);
        });
    });
}