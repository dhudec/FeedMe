var fs = require('fs');
var path = require('path');

module.exports = function(app) {

    // server routes ===========================================================
    fs.readdirSync('./server/controllers').forEach(function (file) {
      if(file.substr(-3) == '.js') {
          route = require('./controllers/' + file);
          route.controller(app);
      }
    });

    // frontend routes =========================================================
    app.get('*', function(req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public/views') }); // load the single page app container
    });

};