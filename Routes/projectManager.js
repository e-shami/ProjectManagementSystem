var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Project = require('../models/project');
var Team = require('../models/team');
var User = require('../models/user');
var Task= require('../Models/task')


router.use(bodyParser.json());

var db = "mongodb://localhost:27017/PMS";
mongoose.connect(db, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.error('Error! ' + err);
    } else {
        console.log('Project manager routes Connected to mongodb');
    }
});

// GET /projects
router.get('/projects', function(req, res) {
    console.log('Get request for all projects');
    Project.find({}, function(err, projects) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(projects);
        }
    });
});

// GET /projects/:id
router.get('/projects/:id', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(project);
        }
    });
});

// GET /teams
router.get('/teams', function(req, res) {
    Team.find({}, function(err, teams) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(teams);
        }
    });
});

// GET /tasks
router.get('/tasks', function(req, res) {
    Task.find({}, function(err, tasks) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(tasks);
        }
    });
});

// GET /users
router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(users);
        }
    });
});

// POST /projects
router.post('/projects', function(req, res) {
    var project = new Project(req.body);
    project.save(function(err) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(project);
        }
    });
});

// POST /teams
router.post('/teams', function(req, res) {
    var team = new Team(req.body);
    team.save(function(err) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(team);
        }
    });
});

// POST /tasks
router.post('/tasks', function(req, res) {
    var task = new Task(req.body);
    task.save(function(err) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(task);
        }
    });
});

// POST /users
router.post('/users', function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(user);
        }
    });
});

// PUT /teams/:id/users/:id
router.put('/teams/:tid/users/:uid', function(req, res) {
    Team.findById(req.params.tid, function(err, team) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            User.findById(req.params.uid, function(err, usr) {
                if (err) {
                    res.status(500).send('Error occured' + err);
                } else {
                    team.members.push(usr);
                    team.save(function(err) {
                        if (err) {
                            res.status(500).send('Error occured' + err);
                        } else {
                            res.json(team);
                        }
                    });
                }
            });
        }
    });
});

// PUT /tasks/:id/users/:id
router.put('/tasks/:id/users/:id', function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    res.status(500).send('Error occured' + err);
                } else {
                    task.users.push(user);
                    task.save(function(err) {
                        if (err) {
                            res.status(500).send('Error occured' + err);
                        } else {
                            res.json(task);
                        }
                    });
                }
            });
        }
    });
});


// PUT /projects/:id/teams/:id
router.put('/projects/:id/teams/:id', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            Team.findById(req.params.id, function(err, team) {
                if (err) {
                    res.status(500).send('Error occured' + err);
                } else {
                    project.teams.push(team);
                    project.save(function(err) {
                        if (err) {
                            res.status(500).send('Error occured' + err);
                        } else {
                            res.json(project);
                        }
                    });
                }
            });
        }
    });
});


// PUT /projects/:id/tasks/:id
router.put('/projects/:id/tasks/:id', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            Task.findById(req.params.id, function(err, task) {
                if (err) {
                    res.status(500).send('Error occured' + err);
                } else {
                    project.tasks.push(task);
                    project.save(function(err) {
                        if (err) {
                            res.status(500).send('Error occured' + err);
                        } else {
                            res.json(project);
                        }
                    });
                }
            });
        }
    });
});

// DELETE /users/:id
router.delete('/users/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.status(204).send('Removed');
        }
    });
});

// DELETE /teams/:id
router.delete('/teams/:id', function(req, res) {
    Team.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.status(204).send('Removed');
        }
    });
});

// DELETE /tasks/:id
router.delete('/tasks/:id', function(req, res) {
    Task.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.status(204).send(req.params.name + 'Removed');
        }
    });
});


// DELETE /projects/:id
router.delete('/projects/:id', function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            res.json(project);
        }
    });
});


// DELETE projects/:id/teams/:id
router.delete('/projects/:id/teams/:id', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            Team.findById(req.params.id, function(err, team) {
                if (err) {
                    res.status(500).send('Error occured' + err);
                } else {
                    project.teams.pull(team);
                    project.save(function(err) {
                        if (err) {
                            res.status(500).send('Error occured' + err);
                        } else {
                            res.json(project);
                        }
                    });
                }
            });
        }
    });
});


// DELETE projects/:id/tasks/:id
router.delete('/projects/:id/tasks/:id', function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            Task.findById(req.params.id, function(err, task) {
                if (err) {
                    res.status(500).send('Error occured' + err);
                } else {
                    project.tasks.pull(task);
                    project.save(function(err) {
                        if (err) {
                            res.status(500).send('Error occured' + err);
                        } else {
                            res.json(project);
                        }
                    });
                }
            });
        }
    });
});


// DELETE /teams/:id/users/:id
router.delete('/teams/:id/users/:id', function(req, res) {
    Team.findById(req.params.id, function(err, team) {
        if (err) {
            res.status(500).send('Error occured' + err);
        } else {
            User.findById(req.params.id, function(err, user) {
                if (err) {
                    res.status(500).send('Error occured' + err);
                } else {
                    team.users.pull(user);
                    team.save(function(err) {
                        if (err) {
                            res.status(500).send('Error occured' + err);
                        } else {
                            res.json(team);
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;