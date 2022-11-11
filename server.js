const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const usr = require('./Routes/user');
const prj = require('./Routes/project');
const tsk= require('./Routes/task');
const tms = require('./Routes/team');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users', usr);
app.use('/projects', prj);
app.use('/tasks',tsk);
app.use('/teams',tms);
app.use('/projectManagers',prjMgr);

app.listen(PORT, function() {
    console.log('Server is running on Port:', PORT);
});
