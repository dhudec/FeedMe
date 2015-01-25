process.env.NODE_ENV = 'test';

var logger = require('winston');
logger.remove(logger.transports.Console);