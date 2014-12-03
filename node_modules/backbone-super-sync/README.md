# Backbone Super Sync

An [isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) Backbone.sync adapter using [super-agent](https://github.com/visionmedia/superagent).

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

## Built-in request caching

At [Artsy](http://artsy.net) we naively cache our server-side Backbone.sync requests. You can configure Backbone Super Sync to do this by setting `superSync.cacheClient = client`. If the `cache: true` option is set in a `model.fetch`, Backbone Super Sync will use the `cacheClient` to cache GET requests. The `client` API is based off of [node-redis](https://github.com/mranney/node_redis) but you could easily leverage this API to roll your own caching mechanism.

e.g.

````javascript
memoryCache = {}
superSync.cacheClient = {
  set: function(key, val, callback) {
    memoryCache[key] = val;
    callback(null, 'OK');
  }),
  get: function(key, callback) {
    callback(null, memoryCache[key]);
  },
  expire: function(key, expiresIn, callback) {
    setTimeout(expiresIn / 1000, function() {
      memoryCache[key] = null;
      callback(null, 1);
    });
  }
}
// Cache expiry time. Uses seconds. Defaults to 3600 or 1 hour. You may
// also pass `cacheTime: Number` in the options of a fetch to set per-request.
superSync.defaultCacheTime = 60;

new Backbone.Model({ id: 'cach-me' }).fetch({
  cache: true,
  success: function() {}
})
````

Use at your own risk—remember [there are only two hard things](http://martinfowler.com/bliki/TwoHardThings.html).

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `npm test`

## License

MIT
