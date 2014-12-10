var HTML, createHistory, frameInit;

createHistory = require("./history");

HTML = require("jsdom").defaultLevel;

frameInit = HTML.HTMLFrameElement._init;

HTML.HTMLFrameElement._init = function() {
  var contentWindow, create, frame, parentWindow;
  frameInit.call(this);
  this.removeEventListener("DOMNodeInsertedIntoDocument", this._initInsertListener);
  frame = this;
  parentWindow = frame.ownerDocument.parentWindow;
  contentWindow = null;
  Object.defineProperties(frame, {
    contentWindow: {
      get: function() {
        return contentWindow || create();
      }
    },
    contentDocument: {
      get: function() {
        return (contentWindow || create()).document;
      }
    }
  });
  return create = function(url) {
    var focus, open;
    focus = function(active) {
      return contentWindow = active;
    };
    open = createHistory(parentWindow.browser, focus);
    contentWindow = open({
      name: frame.name,
      parent: parentWindow,
      url: url,
      referer: parentWindow.location.href
    });
    return contentWindow;
  };
};

HTML.HTMLFrameElement.prototype.setAttribute = function(name, value) {
  return HTML.HTMLElement.prototype.setAttribute.call(this, name, value);
};

HTML.HTMLFrameElement.prototype._attrModified = function(name, value, oldValue) {
  var onload, url;
  HTML.HTMLElement.prototype._attrModified.call(this, name, value, oldValue);
  if (name === "name") {
    return this.ownerDocument.parentWindow.__defineGetter__(value, (function(_this) {
      return function() {
        return _this.contentWindow;
      };
    })(this));
  } else if (name === "src" && value) {
    url = HTML.resourceLoader.resolve(this.ownerDocument, value);
    if (this.contentWindow.location.href === url) {
      return;
    }
    this.contentWindow.location = url;
    onload = (function(_this) {
      return function() {
        _this.contentWindow.removeEventListener("load", onload);
        onload = _this.ownerDocument.createEvent("HTMLEvents");
        onload.initEvent("load", true, false);
        return _this.dispatchEvent(onload);
      };
    })(this);
    return this.contentWindow.addEventListener("load", onload);
  }
};
