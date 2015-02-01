var RecipeCategory = require('../models/recipeCategory');
var Recipe = require('../models/recipe');
var log = require('winston');
var async = require('async');

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
        });
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
        });
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
        var categoryId = req.params.id;
        log.info('Request received for DELETE /api/recipeCategories/' + categoryId);
        Recipe.find({ 'categories' : { $in : [categoryId] } })
        .exec(function (err, recipes) {
            if (err) {
                log.error(err);
                res.sendStatus(500);
            }

            var updates = [];
            recipes.forEach(function(r) {
                updates.push(function(callback) {
                    var indexToRemove = r.categories.indexOf(categoryId);
                    if (indexToRemove > -1) {
                        r.categories.splice(indexToRemove, 1);
                        r.save(function (err) {
                            if (err) 
                                return callback(err);
                            callback(null, r);
                        });
                    }
                });
            });

            async.parallel(updates, function(err, result) {
                /* this code will run after all calls finished the job or
                   when any of the calls passes an error */
                if (err){
                    log.error(err);
                    res.sendStatus(500);
                }
                
                RecipeCategory.findById(categoryId).remove(function (err) {
                    if (!err) {
                        res.sendStatus(200);
                    } else {
                        log.error(err);
                        res.sendStatus(500);
                    }
                });
            });
        });        
    });
}