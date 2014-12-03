# Backbone Cache Sync

An implementation of Backbone.sync that takes the `cache: true`
option. This will store the response in Redis keyed by the url. The
next request to that url with `cache: true` will fetch the cached data
from [Redis](https://github.com/mranney/node_redis) instead of making
a GET request. Requires
[backbone-super-sync](https://github.com/artsy/backbone-super-sync).

## Example

````javascript
REDIS_URL = "redis://redistogo:t0k3n@crestfish.redistogo.com:1337/";
DEFAULT_CACHE_TIME = 3600;
NODE_ENV = "production";
var Backbone = require('backbone');
Backbone.sync = require('backbone-super-sync');
cacheSync = require('backbone-cache-sync');
cacheSync(Backbone.sync, REDIS_URL, DEFAULT_CACHE_TIME, NODE_ENV);

model = new Backbone.Model({id: 'bar'});
model.urlRoot = '/foo';
model.fetch({cache: true});
````

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`

## License

MIT
