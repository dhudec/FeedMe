var mongoose = require('mongoose');

var Recipe = new mongoose.Schema({
	name: {type: String, required: true}
});

module.exports = mongoose.model('Recipe', Recipe);