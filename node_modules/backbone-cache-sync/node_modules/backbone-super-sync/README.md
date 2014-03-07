# Backbone Super Sync

A server-side Backbone.sync adapter that does HTTP requests in node using [super-agent](https://github.com/visionmedia/superagent).

## Example

````javascript
var Backbone = require('backbone');
Backbone.sync = require('backbone-super-sync');
````

## Adding to the Backbone.sync request

Sometimes you need to add to the requests made by Backbone.sync, such as adding an OAuth token. Backbone Super Sync provides the method `editRequest` to intercept the super-agent request object before the request is made.

````javascript
var Backbone = require('backbone');
var superSync = require('backbone-super-sync');
superSync.editRequest(function(req) {
  req.set({ 'X-ACCESS-TOKEN': 'foobar' });
});
Backbone.sync = superSync;
````

The arguments of Backbone.sync are also passed to editRequest in case you need to globally adjust the request based off `options` or otherwise.

````javascript
superSync.editRequest(function(req, method, model, options) {
  req.set({ 'X-ACCESS-TOKEN': options.user.get('access_token') });
});
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`

## License

MIT
