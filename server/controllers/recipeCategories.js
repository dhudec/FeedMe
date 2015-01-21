var RecipeCategory = require('../models/recipeCategory');
var log = require('winston');

module.exports.controller = function(app) {

    app.get('/api/recipeCategories', function(req, res) {
        log.info('Request received for GET /api/recipeCategories');
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
        log.info('Request received for GET /api/recipeCategories/' + req.params.id);
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
        log.info('Request received for POST /api/recipeCategories');
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

    app.put('/api/recipeCategories/:id', function(req, res) {
        log.info('Request received for PUT /api/recipeCategories/' + req.params.id);
        return RecipeCategory.findById(req.params.id, function(err, category) {
            category.name = req.body.name;
            return category.save(function(err) {
              if (!err) {
                res.json(category);
              } else {
                log.error(err);
                res.sendStatus(500);
              }
            });
        });
    });

    app.delete('/api/recipeCategories/:id', function(req, res) {
        log.info('Request received for DELETE /api/recipeCategories/' + req.params.id);
        RecipeCategory.findById(req.params.id).remove(function (err) {
            if (!err) {
                res.sendStatus(200);
            } else {
                log.error(err);
                res.sendStatus(500);
            }
        });
    });
}