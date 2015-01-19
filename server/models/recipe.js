var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: {type: String},
	prepTime: {type: Number},
	cookTime: {type: Number},
    categories  : [ {type : mongoose.Schema.ObjectId, ref : 'RecipeCategory'} ]
});

RecipeSchema.index({'categories': 1})

module.exports = mongoose.model('Recipe', RecipeSchema);