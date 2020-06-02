const express = require('express');
const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const projects = require('./routes/api/projects');


const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/API/users', users);
app.use('/API/tasks', tasks);
app.use('/API/projects', projects);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});