var logger = require('winston');
var fs = require('fs');

if (!fs.existsSync('./logs')) {
    fs.mkdir('./logs', function(err) {
	    if (err) throw err;
	});
}

logger.setLevels({debug: 0, info: 1, warn:2, error: 3, fatal: 4});
logger.addColors({debug: 'green', info:  'cyan', warn:  'yellow', error: 'red', fatal: 'magenta'});
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { 
	level: 'info', 
	colorize: true 
});
logger.add(logger.transports.File, {
	level: 'debug',
    filename: './logs/feedme-server.log',
    maxsize: 1024 * 1024 * 10 // 10MB
});

module.exports = logger;