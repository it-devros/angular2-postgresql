/* File: server/app/models/damian.server.model.js */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DamianSchema = new Schema({
    id: String,
    title: String,
    completed: Boolean
});

mongoose.model('Damian', DamianSchema);