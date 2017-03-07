/* File: server/app/controllers/todo.server.controller.js */

var Todo = require('mongoose').model('Todo'); //refer last line of todo.model.server.js

exports.create = function(req, res, next) {
    var todo = new Todo({
                    id: req.body.id,
                    title: req.body.title,
                    completed: req.body.completed || false

                });
    //creating an instance of todo from the data retrieved from the request body

    //executing the save method of mongo db to store a document/data.
    todo.save(function(err) {
        if(err) {
            res.send({              // return response with code and error message in case of error.
                code: err.code,
                message: err.message
            });
            return next(err);
        } else {
            res.json(todo);         // when successful, return the saved object.
        }
    })
}

// Enables Read Operation using find method
exports.list = function(req, res, next) {
    Todo.find({}, function(err, todos) {
        if (err) {
            return next(err);
        } else {
            res.json(todos);
        }
    });
}

// method for reading single entry based on ID.
// this read method will convert the req.todo object
// to a json response which will be sent to the requestor.

exports.read = function(req, res) {
    res.json(req.todo);
}

// api will call this read method
// req.todo, to read a single entry can be found by 
// below method, using findOne of Mongo DB.

exports.todoByID = function(req, res, next, id) {
    Todo.findOne({
        id: id
    }, function(err, todo) {
        if (err) {
            return next(err);
        } else {
            req.todo = todo;
            // see read method
            next();
        }
    });
}

// method to delete one todo
exports.destroy = function(req, res, next) {
    req.todo.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.todo);
        }
    });
};

//method to update a todo
exports.update = function(req, res, next) {
    Todo.findByIdAndUpdate(req.todo.id, req.body, function(err, tag) {
        if (err) {
            return next(err);
        } else {
            res.json(todo);
        }
    });
};