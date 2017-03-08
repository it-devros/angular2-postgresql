/* File: server/config/express.js */

var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverrirde = require('method-override'),
    cors = require('cors');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cors());
    app.use(bodyParser.json());
    app.use(methodOverrirde());

    require('../app/routes/damian.server.route.js')(app);
    return app;
}
