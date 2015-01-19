var mongoose = require('mongoose');

var RecipeCategorySchema = new mongoose.Schema({
	name: {type: String, required: true},
    //recipes  : [ {type : mongoose.Schema.ObjectId, ref : 'Recipe'} ]
});

module.exports = mongoose.model('RecipeCategory', RecipeCategorySchema);