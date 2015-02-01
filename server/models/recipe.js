var mongoose = require('mongoose');

var supportedUnits = 'lb; oz; c; qt; gal; tsp; tbsp; dash; pinch; to taste'.split('; ');

var RecipeSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	prepTime: {type: Number},
	cookTime: {type: Number},
	instructions: {type: String},
	ingredients: [ { quantity: {type: Number}, units: {type: String, enum: supportedUnits}, item: {type: mongoose.Schema.ObjectId, ref: 'Ingredient'} } ],
    categories: [ {type: mongoose.Schema.ObjectId, ref: 'RecipeCategory'} ]
});

RecipeSchema.index({'categories': 1});

module.exports = mongoose.model('Recipe', RecipeSchema);