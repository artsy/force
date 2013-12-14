var Backbone, client, redis, _;
Backbone = require('backbone');
_ = require('underscore');
redis = require("redis");
client = null;

/**
 * An implementation of Backbone.sync that takes the `cache: true` option. This will store the
 * response in Redis keyed by the url. The next request to that url with `cache: true`
 * will fetch the cached data from Redis instead of making a GET request.
**/

module.exports = function(originalSync, redisUrl, defaultCacheTime, nodeEnv, client) {
    if (defaultCacheTime == null) {
        defaultCacheTime = 3600;
    }

    // Setup redis client
    if (nodeEnv === 'development') {
        client = redis.createClient();
    } else if (nodeEnv !== 'test') {
        var red = require("url").parse(redisUrl || '');
        client = redis.createClient(red.port, red.hostname);
        client.auth(red.auth.split(':')[1]);
    }

    return Backbone.sync = function(method, model, options) {
        if (!(options && options.cache)) {
            return originalSync(method, model, options);
        }

        // Get the url Backbone would have fetched and use it as cache key
        var key = (options ? options.url : false) || _.result(model, 'url');

        if (options.data) {
            key += JSON.stringify(options.data);
        }

        // Check if there is any cached JSON in Redis
        return client.get(key, function(err, cachedJSON) {
            // Return the cached JSON or if stored or make a normal request and store it for later
            if (cachedJSON) {
                if (options && options.success) {
                    options.success(JSON.parse(cachedJSON))
                }
            } else {
                model.once('sync', function(m, res) {
                    client.set(key, JSON.stringify(res));
                    return client.expire(key, defaultCacheTime);
                });
                return originalSync(method, model, options);
            }
        });
    };
};
