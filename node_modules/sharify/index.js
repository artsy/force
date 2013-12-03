module.exports = function(data) {
  
  // Immediately store and export initial shared data
  for(var key in data) {
    module.exports.data[key] = data[key];
  }
  
  // Middleware that injects the shared data into res.locals under "sd"
  return function(req, res, next) {
    res.locals.sd = {};
    for(var key in module.exports.data) {
      res.locals.sd[key] = module.exports.data[key];
    }
    res.locals.sharifyScript = function() {
      return '<script type="text/javascript">' + 
               'window.__sharifyData = ' + JSON.stringify(res.locals.sd) + ';' +
             '</script>';
    }
    next();
  };
};

module.exports.data = {};

// When required on the client via browserify, run this snippet that reads the
// bootstrapped data and injects it into this module.
if (typeof window != 'undefined' && window.__sharifyData) {
  module.exports.data = window.__sharifyData;
}