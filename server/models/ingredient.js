var mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('Ingredient', IngredientSchema);