/* File: server/app/controllers/damian.server.controller.js */

var Damian = require('mongoose').model('Damian'); //refer last line of damian.model.server.js

exports.create = function(req, res, next) {
    var Damian = new Damian({
                    id: req.body.id,
                    title: req.body.title,
                    completed: req.body.completed || false

                });
    //creating an instance of damian from the data retrieved from the request body

    //executing the save method of mongo db to store a document/data.
    damian.save(function(err) {
        if(err) {
            res.send({              // return response with code and error message in case of error.
                code: err.code,
                message: err.message
            });
            return next(err);
        } else {
            res.json(damian);         // when successful, return the saved object.
        }
    })
}

// Enables Read Operation using find method
exports.list = function(req, res, next) {
    Damian.find({}, function(err, damians) {
        if (err) {
            return next(err);
        } else {
            res.json(damians);
        }
    });
}

// method for reading single entry based on ID.
// this read method will convert the req.damian object
// to a json response which will be sent to the requestor.

exports.read = function(req, res) {
    res.json(req.damian);
}

// api will call this read method
// req.damian, to read a single entry can be found by 
// below method, using findOne of Mongo DB.

exports.damianByID = function(req, res, next, id) {
    Damian.findOne({
        id: id
    }, function(err, damian) {
        if (err) {
            return next(err);
        } else {
            req.damian = damian;
            // see read method
            next();
        }
    });
}

// method to delete one damian
exports.destroy = function(req, res, next) {
    req.damian.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.damian);
        }
    });
};

//method to update a damian
exports.update = function(req, res, next) {
    Damian.findByIdAndUpdate(req.damian.id, req.body, function(err, tag) {
        if (err) {
            return next(err);
        } else {
            res.json(damian);
        }
    });
};