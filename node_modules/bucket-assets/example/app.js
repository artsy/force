var bucketAssets = require('../');
var app = require('express')();

app.set('views', __dirname);
app.set('view engine', 'jade');

if (!process.env.S3_KEY) return console.warn("Must provide options with "+
  "env vars. e.g. S3_KEY=xxxx make example");

app.use(bucketAssets());
app.get('/', function(req, res, next) {
  res.render('index');
});
app.listen(5000, function() {
  console.log("Listening on 5000");
});