'use strict'

const express = require('express');
const app = express();
const index = require('./routes/index');
const http = require('http').Server(app);

//setup pug templates
app.use('/static', express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//route handler for '/' route
app.use('/', index);

http.listen(3000, () => {
  console.log("The frontend server is running on port 3000!");
});
