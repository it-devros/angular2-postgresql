/* File: server/server.js */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// creates an instance our express created inside config,
// completely different from var express = require('exoress')
var express = require('./config/express'),
		mongoose = require('./config/mongoose');

// the expressmethod created in ./config/express
// returns an express application
var db = mongoose(),
    app = express();

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000');