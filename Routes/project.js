var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project');
var Team = require('../models/team');
var User = require('../models/user');
var Task= require('../Models/task')
router.use(express.json());

var db = "mongodb://localhost:27017/PMS";
mongoose.connect(db, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.error('Error! ' + err);
    } else {
        console.log('Projects routes Connected to mongodb');
    }
});


// GET /projects
router.get('/', function(req, res) {
    Project.find({}, function(err, projects) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(projects);
        }
    });
});

// GET /projects/:id
router.get('/:id', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(project);
        }
    });
});

// POST /projects
router.post('/', function(req, res) {
    var project = new Project(req.body);
    project.save(function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(project);
        }
    });
});

// PUT /projects/:id
router.put('/:id', function(req, res) {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(project);
        }
    });
});

// DELETE /projects/:id
router.delete('/:id', function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(project);
        }
    });
});

// GET /projects/:id/team
router.get('/:id/team', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Team.findById(project.team, function(err, team) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(team);
                }
            });
        }
    });
});

// GET /projects/:id/tasks
router.get('/:id/tasks', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Task.find({project: project._id}, function(err, tasks) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(tasks);
                }
            });
        }
    });
});


module.exports = router;
