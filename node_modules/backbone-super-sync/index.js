var request = require('superagent'),
    Q = require('q');

METHOD_MAP = {
  'create': 'post',
  'update': 'put',
  'delete': 'del',
  'read': 'get',
  'patch': 'patch'
};

var isServer = typeof window === 'undefined';

module.exports = function(method, model, options) {
  var url = options.url || (typeof model.url == 'function' ? model.url() : model.url);
  var data = options.data || (method === 'create' || method === 'update' ? model.toJSON() : {});
  var req = request[METHOD_MAP[method]](url);
  var deferred = Q.defer();

  // Allow intercepting of the request object to inject sync-wide things like an oAuth token.
  module.exports.editRequest(req, method, model, options);

  // Inject POST/PUT data in body or GET data in querystring
  if (method == 'create' || method == 'update') {
      if(isServer) {
          req.send(data).set('content-length', JSON.stringify(data).length);
      } else {
          req.send(data);
      }
  } else {
    req.query(data);
  }

  // Add common Backbone options like `headers`
  if (options.headers) {
    for(key in options.headers)
    req.set(key, options.headers[key]);
  }

  // End the request using Backbone callbacks and a Q promise
  req.end(function(res) {
    if (res.ok) {
      options.res = res;
      deferred.resolve(model);
      if (options.success) options.success(res.body, res);
    } else if (!res.ok) {
      deferred.reject(res);
      if (options.error) options.error(res);
    }
    if (options.complete) options.complete(res);
  });

  // Trigger request and return our Q promise
  model.trigger('request', model, req, options);
  return deferred.promise;
};

module.exports.editRequest = function(req) {}
