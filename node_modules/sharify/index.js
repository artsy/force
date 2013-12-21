// Middleware that injects the shared data and sharify script
module.exports = function(req, res, next) {
  res.locals.sharify = {
    data: module.exports.data,
    script: function() {
      return '<script type="text/javascript">' +
               'window.__sharifyData = ' + JSON.stringify(module.exports.data) + ';' +
             '</script>';
    }
  };
  // Alias the sharify short-hand for convience
  res.locals.sd = res.locals.sharify.data;
  next();
};

// The shared hash of data
module.exports.data = {};

// When required on the client via browserify, run this snippet that reads the
// sharify.script data and injects it into this module.
var bootstrapOnClient = module.exports.bootstrapOnClient = function() {
  if (typeof window != 'undefined' && window.__sharifyData) {
    module.exports.data = window.__sharifyData;
  }
};
bootstrapOnClient();