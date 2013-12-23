var express = require('express');
var app = express();
var sharify = require('../');

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(sharify);

// Setup sharify's static data
sharify.data = {
  NAME: 'Sharify User',
  ENV: process.env
};

// Require modules dependent on sharify data
var sayHi = require('./shared-module').sayHi;

// Bootstrap the User Agent into sharify, use the shared module on the server.
app.get('*', function(req, res) {
  res.locals.sharify.data.USER_AGENT = req.headers['user-agent'];
  res.locals.sayHi = sayHi;
  res.render('index');
});

app.listen(4000, function() { console.log("Listening on 4000") });