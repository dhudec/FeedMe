var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('winston');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, '../public')));

require('./routes')(app);

var start = function () {
	var port = process.env.PORT || 8080; 
	app.listen(port);
	logger.info('Node server started on port ' + port);
}               

module.exports = app;
module.exports.start = start;