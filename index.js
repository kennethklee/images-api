var config = require('./config'),
    app = require('./server');

app.listen(config.port, function() {
    console.log('Started server on port %d in %s mode', config.port, config.env);
});
