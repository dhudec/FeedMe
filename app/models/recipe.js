var mongoose = require('mongoose');

module.exports = mongoose.model('Recipe', {
	name: {type: String, default: ''}
})