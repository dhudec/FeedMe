var RecipeCategory = require('../models/recipeCategory');
var log = require('winston');

module.exports.controller = function(app) {

    app.get('/api/recipeCategories', function(req, res) {
        log.info('Request received for GET /api/recipeCategoriess');
        RecipeCategory.find(function(err, recipeCategories) {
        	if (!err) {
        		res.json(recipeCategories);
        	} else {
                log.error(err);
                res.sendStatus(500);
        	}
        }).populate('recipes');
    });

    app.get('/api/recipeCategories/:id', function(req, res) {
        return RecipeCategory.findById(req.params.id, function (err, recipeCategory) {
        	if (!err) {
        		res.json(recipeCategory);
        	} else {
                log.error(err);
                res.sendStatus(500);
        	}
        }).populate('recipes');
    });

    app.post('/api/recipeCategories', function(req, res) {
        log.info(JSON.stringify(req.body));
    	var recipeCategory = new RecipeCategory(req.body);
        recipeCategory.save(function(err) {
        	if (!err) {
        		res.json(recipeCategory);
        	} else {
                log.error(err);
        		res.sendStatus(500);
        	}
        }); 
    });

    app.put('/api/recipeCategories', function(req, res) {
        RecipeCategory.find(function(err, recipeCategories) {
            if (err)
                res.send(err);

            res.json(recipeCategories);
        });
    });

    app.delete('/api/recipeCategories', function(req, res) {
        RecipeCategory.find(function(err, recipeCategories) {
            if (err)
                res.send(err);

            res.json(recipeCategories);
        });
    });
}