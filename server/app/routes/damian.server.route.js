/* File: server/app/routes/damian.server.route.js */

var damians = require('../../app/controllers/damian.server.controller');

module.exports = function(app) {
    app.route('/api/damians')
        .post(damians.create)
        .get(damians.list);  // added get method

    app.route('/api/damians/:damianId')
        .get(damians.read)
        .delete(damians.destroy);
    
    app.param('damianId', damians.damianByID);
}