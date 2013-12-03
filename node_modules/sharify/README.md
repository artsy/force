# sharify

Easily share data between your server-side and browserify modules.

## Example

Given an [express](https://github.com/visionmedia/express) app with [jade](https://github.com/visionmedia/jade).

1. Add middleware

````javascript
app.use(sharify({
  API_URL: 'http://artsy.net/api/v1',
  NODE_ENV: process.env.NODE_ENV
}));
````

2. Inject script and use the shared data in template if you want

````jade
html
  body
    //- `sd` is short hand for sharify.data
    if sd.NODE_ENV == 'development'
      #debug-modal
    #scripts
      //- Make sure this is above your other scripts
      != sharifyScript()
      script( src='/bundle.js' )
````

3. Use in browserify/server-side modules

````javascript
var sd = require('sharify').data;

module.exports = function Artwork(id) {
  this.url = sd.API_URL + '/artwork/'  + this.id;
};
````

## Adding dynamic/request level data

Sharify simply injects data into the response locals. If you'd like to add dynamic data that can be required on the client like the static data passed to the constructure, simply inject it into `res.locals.sd`.

````javascript
app.use(sharify({
  API_URL: 'http://artsy.net/api/v1',
  NODE_ENV: process.env.NODE_ENV
});
app.use(function(req, res, next) {
  res.locals.sd.SESSION_ID = req.session.id;
  next();
});
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
