var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project');
const team = require('../models/team');
var Team = require('../models/team');
var User = require('../models/user');
router.use(express.json());

var db = "mongodb://localhost:27017/PMS";
mongoose.connect(db, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.error('Error! ' + err);
    } else {
        console.log('Connected to mongodb');
    }
});

// GET /teams
router.get('/View', function(req, res) {
    Team.find({}, function(err, team) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(team);
        }
    });
});

// POST /teams
router.post('/', function(req, res) {
    var team = new Team(req.body);
    
    team.save(function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(team);
        }
    });
});

// PUT /teams/:id
router.put('/:id', function(req, res) {
    Team.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, task) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json("Done",team);
        }
    });
});

// GET /teams/:id
router.get('/:id', function(req, res) {
    Team.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(team);
        }
    });
});

// DELETE /teams/:id
router.delete('/:id', function(req, res) {
    Team.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(project);
        }
    });
});




module.exports = router;
