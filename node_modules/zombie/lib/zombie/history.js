var Entry, HTML, History, URL, createHistory, createLocation, createWindow, hashChange, parentFrom;

createWindow = require("./window");

HTML = require("jsdom").defaultLevel;

URL = require("url");

createHistory = function(browser, focus) {
  var history;
  history = new History(browser, focus);
  return history.open.bind(history);
};

parentFrom = function(window) {
  if (window.parent !== window.getGlobal()) {
    return window.parent;
  }
};

Entry = (function() {
  function Entry(window, url, pushState) {
    this.window = window;
    this.pushState = pushState;
    this.url = URL.format(url);
    this.next = this.prev = null;
  }

  Entry.prototype.destroy = function(keepAlive) {
    if (this.next) {
      this.next.destroy(keepAlive || this.window);
      this.next = null;
    }
    if (keepAlive === this.window) {
      return;
    }
    if (this.prev && this.prev.window === this.window) {
      return;
    }
    return this.window._destroy();
  };

  Entry.prototype.append = function(newEntry, keepAlive) {
    if (this.next) {
      this.next.destroy(keepAlive);
    }
    newEntry.prev = this;
    return this.next = newEntry;
  };

  return Entry;

})();

History = (function() {
  function History(browser, focus) {
    this.browser = browser;
    this.focus = focus;
    this.first = this.current = null;
  }

  History.prototype.open = function(options) {
    var window;
    options.browser = this.browser;
    options.history = this;
    window = createWindow(options);
    this.addEntry(window, options.url);
    return window;
  };

  History.prototype.destroy = function() {
    var first;
    this.focus(null);
    first = this.first;
    this.first = this.current = null;
    if (first) {
      return first.destroy();
    }
  };

  History.prototype.addEntry = function(window, url, pushState) {
    var entry;
    url || (url = window.location.href);
    entry = new Entry(window, url, pushState);
    if (this.current) {
      this.current.append(entry);
      this.current = entry;
    } else {
      this.current = this.first = entry;
    }
    return this.focus(window);
  };

  History.prototype.replaceEntry = function(window, url, pushState) {
    var entry;
    url || (url = window.location.href);
    entry = new Entry(window, url, pushState);
    if (this.current === this.first) {
      if (this.current) {
        this.current.destroy(window);
      }
      this.current = this.first = entry;
    } else {
      this.current.prev.append(entry, window);
      this.current = entry;
    }
    return this.focus(window);
  };

  History.prototype.updateLocation = function(window, url) {
    return this.current.url = url;
  };

  History.prototype.__defineGetter__("location", function() {
    return createLocation(this);
  });

  History.prototype.submit = function(options) {
    var newWindow, window;
    options.browser = this.browser;
    options.history = this;
    if (window = this.current.window) {
      options.name = window.name;
      options.parent = parentFrom(window);
      options.referer = window.URL;
    }
    newWindow = createWindow(options);
    return this.addEntry(newWindow, options.url);
  };

  History.prototype.__defineGetter__("url", function() {
    var _ref;
    return (_ref = this.current) != null ? _ref.url : void 0;
  });

  History.prototype.assign = function(url) {
    var event, name, parent, window;
    if (this.current) {
      url = HTML.resourceLoader.resolve(this.current.window.document, url);
      name = this.current.window.name;
      parent = parentFrom(this.current.window);
    }
    if (this.current && this.current.url === url) {
      this.replace(url);
      return;
    }
    if (hashChange(this.current, url)) {
      window = this.current.window;
      this.addEntry(window, url);
      event = window.document.createEvent("HTMLEvents");
      event.initEvent("hashchange", true, false);
      window._eventQueue.enqueue(function() {
        return window.dispatchEvent(event);
      });
    } else {
      window = createWindow({
        browser: this.browser,
        history: this,
        name: name,
        url: url,
        parent: parent,
        referer: this.current.window.document.referrer
      });
      this.addEntry(window, url);
    }
  };

  History.prototype.replace = function(url) {
    var event, name, window;
    url = URL.format(url);
    if (this.current) {
      url = HTML.resourceLoader.resolve(this.current.window.document, url);
      name = this.current.window.name;
    }
    if (hashChange(this.current, url)) {
      window = this.current.window;
      this.replaceEntry(window, url);
      event = window.document.createEvent("HTMLEvents");
      event.initEvent("hashchange", true, false);
      window._eventQueue.enqueue(function() {
        return window.dispatchEvent(event);
      });
    } else {
      window = createWindow({
        browser: this.browser,
        history: this,
        name: name,
        url: url,
        parent: parentFrom(this.current.window)
      });
      this.replaceEntry(window, url);
    }
  };

  History.prototype.reload = function() {
    var newWindow, url, window;
    if (window = this.current.window) {
      url = window.location.href;
      newWindow = createWindow({
        browser: this.browser,
        history: this,
        name: window.name,
        url: url
      }, {
        parent: parentFrom(window),
        referer: window.referrer
      });
      return this.replaceEntry(newWindow, url);
    }
  };

  History.prototype.go = function(amount) {
    var event, newHost, oldHost, was, window;
    was = this.current;
    while (amount > 0) {
      if (this.current.next) {
        this.current = this.current.next;
      }
      --amount;
    }
    while (amount < 0) {
      if (this.current.prev) {
        this.current = this.current.prev;
      }
      ++amount;
    }
    if (this.current && was && this.current !== was) {
      window = this.current.window;
      this.focus(window);
      if (this.current.pushState || was.pushState) {
        oldHost = URL.parse(was.url).host;
        newHost = URL.parse(this.current.url).host;
        if (oldHost === newHost) {
          event = window.document.createEvent("HTMLEvents");
          event.initEvent("popstate", false, false);
          event.state = this.current.pushState;
          window._eventQueue.enqueue(function() {
            return window.dispatchEvent(event);
          });
        }
      } else if (hashChange(was, this.current.url)) {
        event = window.document.createEvent("HTMLEvents");
        event.initEvent("hashchange", true, false);
        window._eventQueue.enqueue(function() {
          return window.dispatchEvent(event);
        });
      }
    }
  };

  History.prototype.__defineGetter__("length", function() {
    var entry, length;
    entry = this.first;
    length = 0;
    while (entry) {
      ++length;
      entry = entry.next;
    }
    return length;
  });

  History.prototype.pushState = function(state, title, url) {
    url || (url = this.current.window.location.href);
    url = HTML.resourceLoader.resolve(this.current.window.document, url);
    this.addEntry(this.current.window, url, state || {});
  };

  History.prototype.replaceState = function(state, title, url) {
    url || (url = this.current.window.location.href);
    url = HTML.resourceLoader.resolve(this.current.window.document, url);
    this.replaceEntry(this.current.window, url, state || {});
  };

  History.prototype.__defineGetter__("state", function() {
    if (this.current.pushState) {
      return this.current.pushState;
    }
  });

  History.prototype.dump = function() {
    var cur, dump, i, line;
    cur = this.first;
    i = 1;
    dump = (function() {
      var _results;
      _results = [];
      while (cur) {
        line = cur.next ? '#' + i + ': ' : i + '. ';
        line += URL.format(cur.url);
        cur = cur.next;
        ++i;
        _results.push(line);
      }
      return _results;
    })();
    return dump;
  };

  return History;

})();

hashChange = function(entry, url) {
  var aBase, aHash, bBase, bHash, _ref, _ref1;
  if (!entry) {
    return false;
  }
  _ref = url.split("#"), aBase = _ref[0], aHash = _ref[1];
  _ref1 = entry.url.split("#"), bBase = _ref1[0], bHash = _ref1[1];
  return aBase === bBase && aHash !== bHash;
};

createLocation = function(history) {
  var browser, location, prop, url, _fn, _i, _len, _ref;
  url = history.current ? history.current.url : "about:blank";
  browser = history.browser;
  location = new Object();
  Object.defineProperties(location, {
    assign: {
      value: function(url) {
        if (hashChange(history.current, url)) {
          return history.assign(url);
        } else {
          return browser.eventLoop.next(function() {
            return history.assign(url);
          });
        }
      }
    },
    replace: {
      value: function(url) {
        if (hashChange(history.current, url)) {
          return history.replace(url);
        } else {
          return browser.eventLoop.next(function() {
            return history.replace(url);
          });
        }
      }
    },
    reload: {
      value: function(force) {
        return browser.eventLoop.next(function() {
          return history.reload();
        });
      }
    },
    toString: {
      value: function() {
        return url;
      },
      enumerable: true
    },
    hostname: {
      get: function() {
        return URL.parse(url).hostname;
      },
      set: function(hostname) {
        var newUrl;
        newUrl = URL.parse(url);
        if (newUrl.port) {
          newUrl.host = "" + hostname + ":" + newUrl.port;
        } else {
          newUrl.host = hostname;
        }
        return location.assign(URL.format(newUrl));
      },
      enumerable: true
    },
    href: {
      get: function() {
        return url;
      },
      set: function(href) {
        return location.assign(URL.format(href));
      },
      enumerable: true
    },
    origin: {
      get: function() {
        return "" + this.protocol + "//" + this.host;
      }
    }
  });
  _ref = ["hash", "host", "pathname", "port", "protocol", "search"];
  _fn = (function(_this) {
    return function(prop) {
      return Object.defineProperty(location, prop, {
        get: function() {
          return URL.parse(url)[prop] || "";
        },
        set: function(value) {
          var newUrl;
          newUrl = URL.parse(url);
          newUrl[prop] = value;
          return location.assign(URL.format(newUrl));
        },
        enumerable: true
      });
    };
  })(this);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    prop = _ref[_i];
    _fn(prop);
  }
  return location;
};

module.exports = createHistory;
