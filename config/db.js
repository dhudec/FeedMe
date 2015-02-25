var development = (function() {
	var config = {};

	config.url = 'mongodb://localhost/feedme-dev'

	return config;
}());

var production = (function() {
	var config = {};
	var dbUser = process.env.MONGO_USER || '';
	var dbPw = process.env.MONGO_PW || '';

	config.url = 'mongodb://' + dbUser +':' + dbPw + '@ds047901.mongolab.com:47901/feedme'

	return config;
}());

module.exports = (process.env.MODE == 'production') ? production : development;