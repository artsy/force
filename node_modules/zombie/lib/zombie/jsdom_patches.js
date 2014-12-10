var HTML;

HTML = require("jsdom").defaultLevel;

HTML.HTMLDocument.prototype.__defineGetter__("scripts", function() {
  return new HTML.HTMLCollection(this, (function(_this) {
    return function() {
      return _this.querySelectorAll('script');
    };
  })(this));
});

HTML.HTMLElement.prototype.__defineGetter__("offsetLeft", function() {
  return 0;
});

HTML.HTMLElement.prototype.__defineGetter__("offsetTop", function() {
  return 0;
});

HTML.HTMLAnchorElement.prototype._eventDefaults = {
  click: function(event) {
    var anchor, browser, window;
    anchor = event.target;
    if (!anchor.href) {
      return;
    }
    window = anchor.ownerDocument.window;
    browser = window.browser;
    switch (anchor.target || "_self") {
      case "_self":
        window.location = anchor.href;
        break;
      case "_parent":
        window.parent.location = anchor.href;
        break;
      case "_top":
        window.top.location = anchor.href;
        break;
      default:
        browser.tabs.open({
          name: anchor.target,
          url: anchor.href
        });
    }
    return browser.emit("link", anchor.href, anchor.target || "_self");
  }
};

["height", "width"].forEach(function(prop) {
  var client, offset;
  client = "client" + (prop[0].toUpperCase()) + (prop.slice(1));
  offset = "offset" + (prop[0].toUpperCase()) + (prop.slice(1));
  Object.defineProperty(HTML.HTMLElement.prototype, client, {
    get: function() {
      var value;
      value = parseInt(this.style.getPropertyValue(prop), 10);
      if (Number.isFinite(value)) {
        return value;
      } else {
        return 100;
      }
    }
  });
  return Object.defineProperty(HTML.HTMLElement.prototype, offset, {
    configurable: true,
    get: function() {
      return 0;
    }
  });
});

HTML.HTMLImageElement.prototype._attrModified = function(name, value, oldVal) {
  var src;
  if (name === 'src') {
    src = HTML.resourceLoader.resolve(this._ownerDocument, value);
    if (this.src !== src) {
      return HTML.resourceLoader.load(this, value);
    }
  }
};

HTML.HTMLElement.prototype.insertAdjacentHTML = function(position, html) {
  var container, first_child, next_sibling, node, parentNode, _results, _results1, _results2, _results3;
  container = this.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml", "_");
  parentNode = this.parentNode;
  container.innerHTML = html;
  switch (position.toLowerCase()) {
    case "beforebegin":
      _results = [];
      while ((node = container.firstChild)) {
        _results.push(parentNode.insertBefore(node, this));
      }
      return _results;
      break;
    case "afterbegin":
      first_child = this.firstChild;
      _results1 = [];
      while ((node = container.lastChild)) {
        _results1.push(first_child = this.insertBefore(node, first_child));
      }
      return _results1;
      break;
    case "beforeend":
      _results2 = [];
      while ((node = container.firstChild)) {
        _results2.push(this.appendChild(node));
      }
      return _results2;
      break;
    case "afterend":
      next_sibling = this.nextSibling;
      _results3 = [];
      while ((node = container.lastChild)) {
        _results3.push(next_sibling = parentNode.insertBefore(node, next_sibling));
      }
      return _results3;
  }
};

HTML.Node.prototype.contains = function(otherNode) {
  return !!(this.compareDocumentPosition(otherNode) & 16);
};

Object.defineProperty(HTML.CSSStyleDeclaration.prototype, "opacity", {
  get: function() {
    var opacity;
    opacity = this.getPropertyValue("opacity");
    if (Number.isFinite(opacity)) {
      return opacity.toString();
    } else {
      return "";
    }
  },
  set: function(opacity) {
    if (opacity === null || opacity === void 0 || opacity === "") {
      return this.removeProperty("opacity");
    } else {
      opacity = parseFloat(opacity);
      if (isFinite(opacity)) {
        return this._setProperty("opacity", opacity);
      }
    }
  }
});
