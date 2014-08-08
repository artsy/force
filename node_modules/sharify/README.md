# sharify

Easily share data between Browserify modules meant to run on the server and client.

## Example

The following example shares a [Backbone Model](http://backbonejs.org/) between the server and browser. However, this could be applied to any module shared server/client.

#### Inject some constant data on the server and mount sharify

````javascript
var sharify = require('sharify');
sharify.data = {
  API_URL: 'http://artsy.net/api/v1',
  NODE_ENV: process.env.NODE_ENV
};
app.use(sharify);
````

#### Use in a module that can run on the server or client

````javascript
var Backbone = require('backbone'),
    API_URL = require('sharify').data.API_URL;

var Artwork = module.exports = Backbone.Model.extend({
  urlRoot: API_URL + '/artwork/'
};
````

#### Inject sharify script in the view

````jade
html
  body
    //- Adds `sharify.data` and a convenient `sd` short hand to locals
    if sharify.data.NODE_ENV == 'development'
      #debug-modal
    #scripts
      //- Make sure this is above your other scripts
      != sharify.script()
      script( src='/bundle.js' )
````

_NOTE: Sharify will safely expose the `sharify.data` and `sd` globals to the client-side for the convenience of sharing templates server/client._

#### Use the shared module server/client

````javascript
// server.js
var Artwork = require('../models/artwork');

app.get('/artwork/:id', function(req, res) {
  new Artwork({ id: req.params.id }).fetch(//...);
});
````

````javascript
// client.js
var Artwork = require('../models/artwork'),
    View = require('view.js');

new View({ model: new Artwork() });
````

## Bootstrapping Request-level Data to the Client

You can use sharify to [bootstrap](http://backbonejs.org/#FAQ-bootstrap) dynamic data as well.

Inject data into the `sharify.data` local

````javascript
var Artwork = require('../models/artwork');

app.get('artwork/:id', function(req, res, next) {
  new Artwork({ id: req.params.id }).fetch({
    success: function(artwork) {
      res.locals.sharify.data.ARTWORK_JSON = artwork.toJSON();
      res.render('artwork');
    }
  });
});
````

Require the data on the client

````javascript
var Artwork = require('../models/artwork'),
    ARTWORK_JSON = require('sharify').data.ARTWORK_JSON,
    View = require('view.js');

new View({ model: new Artwork(ARTWORK_JSON) });
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT
