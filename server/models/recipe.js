var mongoose = require('mongoose');
var Units = require('./units');

var RecipeSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	prepTime: {type: Number},
	cookTime: {type: Number},
	instructions: {type: String},
	ingredients: [ { quantity: {type: Number}, units: {type: String, enum: Units.ingredientUnits}, item: {type: mongoose.Schema.ObjectId, ref: 'Ingredient'}, note: {type: String} } ],
    categories: [ {type: mongoose.Schema.ObjectId, ref: 'RecipeCategory'} ],
    image: {type: String}
});

RecipeSchema.index({'categories': 1});

module.exports = mongoose.model('Recipe', RecipeSchema);