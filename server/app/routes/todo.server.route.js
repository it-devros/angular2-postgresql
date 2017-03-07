/* File: server/app/routes/todo.server.route.js */

var todos = require('../../app/controllers/todo.server.controller');

module.exports = function(app) {
    app.route('/api/todos')
        .post(todos.create)
        .get(todos.list);  // added get method

    app.route('/api/todos/:todoId')
        .get(todos.read)
        .delete(todos.destroy);
    
    app.param('todoId', todos.todoByID);
}