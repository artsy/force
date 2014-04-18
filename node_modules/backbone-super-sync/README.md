# Backbone Super Sync

A server-side Backbone.sync adapter that does HTTP requests in node using [super-agent](https://github.com/visionmedia/superagent).

## Example

````javascript
var Backbone = require('backbone');
Backbone.sync = require('backbone-super-sync');
````

## Adding to the Backbone.sync request

Sometimes you need to add to the requests made by Backbone.sync, such as adding an XAPP token. Backbone Super Sync provides the method `editRequest` to intercept the super-agent request object before the request is made.

**NOTE**: This is injected into _ALL_ server-side Backbone.sync calls. This behaves signifcantly different than when Backbone is used on the client. For instance you should not use this to add user-specific data to a request like an oauth access token or similar identifier where as on the client you might want to inject that kind of data sync-wide b/c the browser only represents one user.

````javascript
var Backbone = require('backbone');
var superSync = require('backbone-super-sync');
superSync.editRequest(function(req) {
  req.set({ 'XAPP-TOKEN': 'foobar' });
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
