var CoffeeScript, HTML, URL, ex;

HTML = require("jsdom").defaultLevel;

URL = require("url");

try {
  CoffeeScript = require("coffee-script");
  HTML.languageProcessors.coffeescript = function(element, code, filename) {
    return this.javascript(element, CoffeeScript.compile(code), filename);
  };
} catch (_error) {
  ex = _error;
}

HTML.languageProcessors.javascript = function(element, code, filename) {
  var browser, cast, document, error, window;
  window = element.ownerDocument.window;
  browser = window && window.top.browser;
  if (browser && !browser.runScripts) {
    return;
  }
  if (code) {
    document = element.ownerDocument;
    window = document.window;
    try {
      return window._evaluate(code, filename);
    } catch (_error) {
      error = _error;
      if (!error.hasOwnProperty("stack")) {
        cast = new Error(error.message || error.toString());
        cast.stack = error.stack;
        error = cast;
      }
      return document.raise("error", error.message, {
        exception: error
      });
    }
  }
};

HTML.HTMLScriptElement._init = function() {
  this.addEventListener("DOMNodeInsertedIntoDocument", function() {
    var executeInOrder, executeInlineScript, filename;
    if (this.src) {
      return HTML.resourceLoader.load(this, this.src, this._eval);
    } else {
      if (this.id) {
        filename = "" + this.ownerDocument.URL + ":#" + this.id;
      } else {
        filename = "" + this.ownerDocument.URL + ":script";
      }
      executeInlineScript = (function(_this) {
        return function() {
          return _this._eval(_this.textContent, filename);
        };
      })(this);
      executeInOrder = HTML.resourceLoader.enqueue(this, executeInlineScript, filename);
      if (this.ownerDocument.readyState === "loading") {
        return process.nextTick(executeInOrder);
      } else {
        return executeInOrder();
      }
    }
  });
};

HTML.resourceLoader.load = function(element, href, callback) {
  var document, loaded, ownerImplementation, tagName, url, window;
  document = element.ownerDocument;
  window = document.parentWindow;
  ownerImplementation = document.implementation;
  tagName = element.tagName.toLowerCase();
  if (ownerImplementation.hasFeature("FetchExternalResources", tagName)) {
    loaded = function(response) {
      return callback.call(element, response.body.toString(), url.pathname);
    };
    url = HTML.resourceLoader.resolve(document, href);
    return window._eventQueue.http("GET", url, {
      target: element
    }, this.enqueue(element, loaded, url));
  }
};
