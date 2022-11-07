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

// GET /projects/:id/teams
router.get('/:id/teams', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Team.find({_id: {$in: project.teams}}, function(err, teams) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(teams);
                }
            });
        }
    });
});


// GET /projects/:id/teams/:teamId
router.get('/:id/teams/:teamId', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Team.findById(req.params.teamId, function(err, team) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(team);
                }
            });
        }
    });
});

// POST /projects/:id/teams
router.post('/:id/teams', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            var team = new Team(req.body);
            team.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    project.teams.push(team);
                    project.save(function(err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(team);
                        }
                    });
                }
            });
        }
    });
});


// PUT /projects/:id/teams/:teamId
router.put('/:id/teams/:teamId', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Team.findByIdAndUpdate(req.params.teamId, req.body, {new: true}, function(err, team) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(team);
                }
            });
        }
    });
});


// DELETE /projects/:id/teams/:teamId
router.delete('/:id/teams/:teamId', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Team.findByIdAndRemove(req.params.teamId, function(err, team) {
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
            Task.find({_id: {$in: project.tasks}}, function(err, tasks) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(tasks);
                }
            });
        }
    });
});


// GET /projects/:id/tasks/:taskId
router.get('/:id/tasks/:taskId', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Task.findById(req.params.taskId, function(err, task) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(task);
                }
            });
        }

    });
});

// POST /projects/:id/tasks
router.post('/:id/tasks', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            var task = new Task(req.body);
            task.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    project.tasks.push(task);
                    project.save(function(err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(task);
                        }
                    });
                }
            });
        }
    });
});


// PUT /projects/:id/tasks/:taskId
router.put('/:id/tasks/:taskId', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true}, function(err, task) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(task);
                }
            });
        }
    });
});


// DELETE /projects/:id/tasks/:taskId
router.delete('/:id/tasks/:taskId', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send(err);
        } else {
            Task.findByIdAndRemove(req.params.taskId, function(err, task) {
                if (err) {
                    res.status(500).send(err);

                } else {
                    res.json(task);
                }
            });
        }
    });
});



module.exports = router;
