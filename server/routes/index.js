var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var crypto = require('crypto');

var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

module.exports = function() {
    var app = express();
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cors());
    app.use(bodyParser.json());
    var router = express.Router();

    //pg config
    var pg = require('pg');
    var conString = 'postgres://postgres:postgres@localhost/damian';

    //Users
    //get all users
    router.get('/api/suppliers', function(req, res, next) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
            return console.error('error fetching client from pool', err);
            }
            console.log("connected to database");
            client.query('SELECT * FROM suppliers WHERE active = $1', [true], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result.rows);
            res.send(result.rows[0]);
            });
        });
    });

    //post user
    router.post('/api/users', function(req, res, next) {
        console.log('post');
        pg.connect(conString, function(err, client, done) {
            if (err) {
            return console.error('error fetching client from pool', err);
            }
            console.log("connected to database");

            client.query('SELECT * FROM users WHERE email = $1', [req.body.username], function(err, result) {
                done();
                if (err) {
                    return console.error('There are no users like email or password.', err);
                }
                console.log(result.rows);
                if(result.rows.length == 0)
                {
                    client.query('INSERT INTO users(first_name, last_name, email, password, address) VALUES($1, $2, $3, $4, $5) returning id_user', [req.body.firstName, req.body.lastName,  req.body.username,  encrypt(req.body.password), req.body.address], function(err, result) {
                    done();
                    if(err) {
                        return console.error('error running query', err);
                    }
                    console.log(result);
                    res.send(result);
                    });
                }
                else
                {
                    console.log(result);
                    res.send(result);
                }
            });
            
                    
        });
    });


    //authentication user
    router.post('/api/authenticate', function(req, res, next) {
        console.log('authenticate');
        pg.connect(conString, function(err, client, done) {
            if (err) {
            return console.error('error fetching client from pool', err);
            }
            console.log("connected to database");
            console.log(req.body.password);
            var passw  = encrypt(req.body.password);
            client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [req.body.username, passw], function(err, result) {
                done();
                if (err) {
                    return console.error('There are no users like email or password.', err);
                }
                res.send(result.rows[0]);
            });

        });
    });

    //get one user
    router.get('/users/:id', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM users WHERE id = $1', [req.params.id], function(err, result) {
        done();
        if (err) {
            return console.error('error running query', err);
        }
        res.send(result);
        });
    });
    });

    // update user
    router.put('/users/:id', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        //compare with .compareSync(req.body.data.attributes.password, storedPW)
        client.query('UPDATE users SET username = $2, password = $3  WHERE id = $1', [req.params.id, req.body.username, req.body.password], function(err, result) {
        done();
        if (err) {
            return console.error('error running query', err);
        }
        res.send(result);
        });
    });
    });

    //delete one user
    router.delete('/users/:id', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        console.log(conString)
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('DELETE FROM users WHERE id = $1',[req.params.id], function(err, result) {
        done();
        if (err) {
            return console.error('error running query', err);
        }
        res.send(result);
        });
    });
    });

    app.use(router);

    return app;

}

