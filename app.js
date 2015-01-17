var mongoose = require('mongoose');
var db = require('./config/db');
var server = require('./server/server');
var logger = require('./config/logger.js');

mongoose.connect(db.url);

server.start();