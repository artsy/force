var Assert, Browser, Resources;

Assert = require("./assert");

Resources = require("./resources");

Browser = require("./browser");

Browser.Assert = Assert;

Browser.Resources = Resources;

Browser.visit = function(url, options, callback) {
  var browser, _ref;
  if (arguments.length === 2 && typeof options === "function") {
    _ref = [null, options], options = _ref[0], callback = _ref[1];
  }
  browser = Browser.create(options);
  if (callback) {
    return browser.visit(url, function(error) {
      return callback(error, browser);
    });
  } else {
    return browser.visit(url).then(function() {
      return browser;
    });
  }
};

Browser.listen = function(port, callback) {
  return require("./zombie/protocol").listen(port, callback);
};

module.exports = Browser;
