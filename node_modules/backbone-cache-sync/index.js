var Backbone, client, redis, _, Q;
Backbone = require('backbone');
_ = require('underscore');
redis = require("redis");
client = null;
Q = require('q');

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
        var deferred = Q.defer();

        if (!(options && options.cache)) {
            return originalSync(method, model, options);
        }

        var cacheTime = (options && options.cacheTime) ? options.cacheTime : defaultCacheTime;

        // Get the url Backbone would have fetched and use it as cache key
        var key = (options ? options.url : false) || _.result(model, 'url');

        if (options.data) {
            key += JSON.stringify(options.data);
        }

        // Check if there is any cached JSON in Redis
        client.get(key, function(err, cachedJSON) {

            // Return the cached JSON or if stored -- make a normal request and store it for later
            if (cachedJSON) {
                var jsonObj = JSON.parse(cachedJSON);
                if (options && options.success) options.success(jsonObj);
                deferred.resolve(jsonObj);
            } else {
                model.once('sync', function(m, res) {
                    client.set(key, JSON.stringify(res));
                    return client.expire(key, cacheTime);
                });
                var dfd = originalSync(method, model, options);
                if (dfd && dfd.then) dfd.then(deferred.resolve, deferred.reject);
            }
        });
        return deferred.promise;
    };
};
