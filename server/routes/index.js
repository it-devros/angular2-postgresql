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
    //get all suppliers
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
            if (result.rows.length == 0)
            {
                res.send(err);
            }
            else{
                res.send(result.rows);
            }
            
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
                    res.send(err);
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
                if (result.rows.length == 0)
                {
                    res.send(err);
                }
                else
                {
                    res.send(result.rows[0]);
                }
                
            });

        });
    });

    //get one user
    router.get('/api/suppliers_materials:id', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM suppliers_materials WHERE id_supplier = $1', [req.params.id], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            if (result.rows.length == 0)
            {
                res.send(err);
            }
            else{
                res.send(result.rows);
            }
            
        });
    });
    });

    router.get('/api/materials', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM materials_master', [], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            if (result.rows.length == 0)
            {
                res.send(err);
            }
            else{
                res.send(result.rows);
            }
            
        });
    });
    });

    router.get('/api/types', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM materials_type', [], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            if (result.rows.length == 0)
            {
                res.send(err);
            }
            else{
                res.send(result.rows);
            }
            
        });
    });
    });

    router.get('/api/materials:id', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM materials_master WHERE id_material = $1', [req.params.id], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            if (result.rows.length == 0)
            {
                res.send(err);
            }
            else{
                res.send(result.rows[0]);
            }
            
        });
    });
    });

    router.get('/api/types:id', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM materials_type WHERE id_materialtype = $1', [req.params.id], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            if (result.rows.length == 0)
            {
                res.send(err);
            }
            else{
                res.send(result.rows[0]);
            }
            
        });
    });
    });


    router.post('/api/purchase_order', function(req, res, next) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
            return console.error('error fetching client from pool', err);
        }
        var timetemp = new Date();
        var dat = timetemp.getDate();
        var mon = timetemp.getMonth();
        var year = timetemp.getFullYear();
        var time = mon + "/" + dat + "/" + year;
            console.log("connected to database");
            client.query('INSERT INTO purchase_orders(id_supplier, date, completed, total) VALUES($1, $2, $3, $4)', [req.body.id, time, false, req.body.sum], function(err, result) {
                done();
                if (err) {
                    return console.error('Some errors detected.', err);
                }
                res.send(result);
                
            });

        });
    });

    router.post('/api/dispatches', function(req, res, next) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
            return console.error('error fetching client from pool', err);
        }
        
            console.log("connected to database");
            client.query('INSERT INTO dispatches(id_purchase_order, dispatch_date, reference ) VALUES($1, $2, $3)', [req.body.id, req.body.date, "this is ok."], function(err, result) {
                done();
                if (err) {
                    return console.error('Some errors detected.', err);
                }
                res.send(result);
                
            });

        });
    });


    router.post('/api/purchase_line', function(req, res, next) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
            return console.error('error fetching client from pool', err);
            }
            console.log("connected to database");

            client.query('SELECT * FROM purchase_orders WHERE id_supplier = $1', [req.body.id_supplier], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            
            var rand_temp = Math.random();

            var id_purchase = 0;
            if(result.rows.length == 1)
            {
                id_purchase = result.rows[0].id_purchase_orders;
            }
            if(result.rows.length > 1)
            {
                
                var temps = result.rows.length - 1;
                id_purchase = result.rows[temps].id_purchase_orders;
            }

            for (var i = 0; i < req.body.materials.length ; i++)
            {
                rand_temp = Math.random()*1000;
                console.log(Math.ceil(rand_temp));
                client.query('INSERT INTO po_lines(id_purchase_order, id_line, id_material, quantity, price_unit, client) VALUES($1, $2, $3, $4, $5, $6)', [id_purchase, result.rows[0].id_purchase_orders+Math.ceil(rand_temp)+req.body.materials[i].id_material, req.body.materials[i].id_material, req.body.quantities[i], req.body.materials[i].price, req.body.client_name], function(err, result) {
                    done();
                    if (err) {
                        //res.send(err);
                        return console.error('Some errors detected.', err);
                    }
                    //res.send(result);
                    
                });
            }
            res.send(result);

            });
                
        });
    });


    router.post('/api/dispatch_line', function(req, res, next) {
        pg.connect(conString, function(err, client, done) {
            if (err) {
            return console.error('error fetching client from pool', err);
            }
            console.log("connected to database");

            client.query('SELECT * FROM dispatches WHERE id_purchase_order = $1', [req.body.polines[0].id_purchase_order], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            
            var rand_temp = Math.random();

            var id_dispatch = 0;
            if(result.rows.length == 1)
            {
                id_dispatch = result.rows[0].id_dispatch;
            }
            if(result.rows.length > 1)
            {
                
                var temps = result.rows.length - 1;
                id_dispatch = result.rows[temps].id_dispatch;
            }

            for (var i = 0; i < req.body.polines.length ; i++)
            {
                rand_temp = Math.random()*1000;
                console.log(Math.ceil(rand_temp));
                client.query('INSERT INTO dispatch_lines(id_dispatch, id_line, id_material, quantity) VALUES($1, $2, $3, $4)', [id_dispatch, req.body.polines[i].id_line, req.body.polines[i].id_material, req.body.polines[i].quantity], function(err, result) {
                    done();
                    if (err) {
                        //res.send(err);
                        return console.error('Some errors detected.', err);
                    }
                    //res.send(result);
                    
                });
            }
            res.send(result);

            });
                
        });
    });


    router.put('/api/updatepo', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('UPDATE purchase_orders SET completed = true  WHERE id_purchase_orders = $1', [req.params.id], function(err, result) {
        done();
        if (err) {
            return console.error('error running query', err);
        }
        res.send(result);
        });
    });
    });



    router.get('/api/polines:email', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM po_lines WHERE client = $1', [req.params.email], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            if (result.rows.length == 0)
            {
                res.send(err);
            }
            else{
                res.send(result.rows);
            }
            
        });
    });
    });
    
    router.get('/api/orders:id_supplier', function(req, res, next) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
        return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM purchase_orders WHERE id_supplier = $1 AND completed = false', [req.params.id_supplier], function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            if (result.rows.length == 0)
            {
                res.send(err);
            }
            else{
                res.send(result.rows);
            }
            
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

