var fs = require('fs');

module.exports = function(app) {

    // server routes ===========================================================
    // dynamically include controller routes
    fs.readdirSync('./app/controllers').forEach(function (file) {
      if(file.substr(-3) == '.js') {
          route = require('./controllers/' + file);
          route.controller(app);
      }
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load the single page app container
    });

};