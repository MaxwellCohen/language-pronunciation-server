
const express = require('express');
const bodyParser = require('body-parser');
const createHandler = require('azure-function-express').createHandler;
const app = express();
const {api} = require('./api/api.js');
const {checkVariables} = require('./api/checkEnvVars');

checkVariables();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use('/api', api);

app.get('/api/hello', (req, res) => res.send('Hello World!'));

module.exports = createHandler(app);

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

