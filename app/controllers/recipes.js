var Recipe = require('../models/recipe');

module.exports.controller = function(app) {

    app.get('/api/recipes', function(req, res) {
        Recipe.find(function(err, recipes) {
        	if (!err) {
        		res.json(recipes);
        	} else {
        		res.send(err);
        	}
        });
    });

    app.get('/api/recipes/:id', function(req, res) {
        return Recipe.findById(req.params.id, function (err, recipe) {
        	if (!err) {
        		res.json(recipe);
        	} else {
        		res.send(err);
        	}
        });
    });

    app.post('/api/recipes', function(req, res) {
    	console.log(req.body);
    	var recipe = new Recipe(req.body);
        recipe.save(function(err) {
        	if (!err) {
        		res.json(recipe);
        	} else {
        		res.send(err);
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