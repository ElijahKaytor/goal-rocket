var http = require('http');

var express = require('express');

var db     = require('./models');
var submit = require('./routes/submit');


var app = express();

// Express `app` settings
app.set('port', process.env.port || 3000);
app.use(express.methodOverride());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

// Environment configuration
app.configure('development', function() {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
});

app.configure('production', function() {
    // TODO - Custom logger?
    app.use(express.logger());

    // TODO - Custom Error handler
    //   Add 4xx and 5xx handlers?
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(500);
        res.send('<html><head></head><body><p>err != nil</p></body></html>');
    });
});

// Register routes
app.get('/submit', submit.submit.get);
app.post('/submit', submit.submit.post);

// Setup database
db.sequelize
    .sync()
    .complete(function(err) {
    if (err) {
        throw err;
    }

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
