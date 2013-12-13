var request = require('superagent');

METHOD_MAP = {
  'create': 'post',
  'update': 'put',
  'delete': 'del',
  'read': 'get'
};

module.exports = function(method, model, options) {
  var url = options.url || (typeof model.url == 'function' ? model.url() : model.url);
  var data = options.data || (method === 'create' || method === 'update' ? model.toJSON() : {});
  var req = request[METHOD_MAP[method]](url);

  // Allow intercepting of the request object to inject sync-wide things like an oAuth token.
  module.exports.editRequest(req, method, model, options);

  // Inject POST/PUT data in body or GET data in querystring
  if (method == 'create' || method == 'update') {
    req.send(data).set('content-length', JSON.stringify(data).length);
  } else {
    req.query(data);
  }

  req.end(function(res) {
    if (res.ok && options.success) {
      options.res = res;
      options.success(res.body, res);
    } else if (!res.ok && options.error) {
      options.error(res);
    }
  });

  model.trigger('request', model, req, options);
};

module.exports.editRequest = function(req) {}
