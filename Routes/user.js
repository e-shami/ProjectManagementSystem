var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
const bodyParser = require('body-parser');
var authenticate = require('authenticate');
router.use(bodyParser.json());

const db = "mongodb://localhost:27017/PMS";
const mongoose = require('mongoose');
mongoose.connect(db, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.error('Error! ' + err);
    } else {
        console.log('Users routes Connected to mongodb');
    }
});

// GET /users
router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(users);
        }
    });
});

// GET /users/:id
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
});

// POST /users/signup
router.post('/signup', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err) {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        } else {
            passport.authenticate('local')(req, res, function() {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Registration Successful!'});
            });
        }
    }); 
});

// POST /users/login
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, status: 'You are successfully logged in!'});
});

// GET /users/logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});


// PUT /users/:id
router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
});

// DELETE /users/:id
router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
});


module.exports = router;