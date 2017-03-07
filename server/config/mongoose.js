/* File: server/config/mongoose.js */

var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    require('../app/models/todo.server.model'); // model name

    return db;
}    

// note: elsewhere, we will be using mongoose.js to
// refere to instance of mongoose not
// require('mongoose')