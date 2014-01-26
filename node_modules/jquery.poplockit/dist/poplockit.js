/*! jQuery.popLockIt - v0.1.2 - 2013-09-20
* http://zamiang.github.com/jquery.poplockit
* Copyright (c) 2013 Brennan Moore; Licensed MIT */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($, window, document) {
    var Base, Column, Feed, FeedItem, pluginName;
    pluginName = "popLockIt";
    Base = (function() {

      Base.prototype.requires = [];

      function Base($el, settings) {
        var require, _i, _len, _ref;
        this.$el = $el;
        this.settings = settings;
        _ref = this.requires;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          require = _ref[_i];
          if (this.settings[require] == null) {
            throw "You must pass " + require;
          }
        }
      }

      return Base;

    })();
    Column = (function(_super) {

      __extends(Column, _super);

      Column.prototype.requires = ['height', 'marginTop', 'marginLeft', 'marginBottom'];

      Column.prototype.cssProperties = ['position', 'top', 'bottom', 'left'];

      Column.prototype.marginTop = 0;

      Column.prototype.marginBottom = 0;

      Column.prototype.marginLeft = 0;

      Column.prototype.parentHeight = 0;

      Column.prototype.height = 0;

      Column.prototype.top = 0;

      Column.prototype.bottom = 0;

      Column.prototype.left = 0;

      function Column($el, settings) {
        this.$el = $el;
        this.settings = settings;
        this;

      }

      Column.prototype.setMargins = function(settings) {
        if (settings.parentHeight) {
          this.parentHeight = settings.parentHeight;
        }
        if (settings.marginTop) {
          this.marginTop = settings.marginTop;
        }
        if (settings.marginBottom) {
          this.marginBottom = settings.marginBottom;
        }
        if (settings.marginLeft) {
          return this.marginLeft = settings.marginLeft;
        }
      };

      Column.prototype.setDimensions = function() {
        this.height = Math.floor(Number(this.$el.css('height').replace('px', "")));
        this.top = Math.floor(this.$el.offset().top - this.marginTop);
        this.left = Math.floor(this.$el.offset().left);
        this.bottom = Math.floor(this.top + this.parentHeight - this.height);
        if (this.top < 1) {
          return this.top = 1;
        }
      };

      Column.prototype.setPosition = function(pos, direction) {
        var changed, diff, newState, prop, _i, _len, _ref;
        if (pos == null) {
          pos = 'absolute';
        }
        if (direction == null) {
          direction = 'north';
        }
        newState = {
          position: pos,
          left: Math.round(this.getLeftForPosition(pos))
        };
        if (pos === 'absolute') {
          newState.top = direction === 'north' ? this.marginTop : 'auto';
          newState.bottom = direction === 'south' ? this.marginBottom : 'auto';
        } else {
          newState.top = direction === 'north' ? this.marginTop : 'auto';
          newState.bottom = direction === 'south' ? 0 : 'auto';
        }
        if (!this.oldState) {
          this.$el.css(newState);
          return this.oldState = newState;
        }
        diff = {};
        changed = false;
        _ref = this.cssProperties;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          prop = _ref[_i];
          if (newState[prop] !== this.oldState[prop]) {
            diff[prop] = newState[prop];
            changed = true;
          }
        }
        if (changed) {
          this.$el.css(diff);
          return this.oldState = newState;
        }
      };

      Column.prototype.getLeftForPosition = function(pos) {
        if (pos === 'fixed') {
          return this.left;
        } else if (pos === 'static') {
          return 0;
        } else {
          return this.left - this.marginLeft;
        }
      };

      Column.prototype.onScroll = function(scrollTop, viewportHeight, preventFixed, scrollDirection) {
        if (preventFixed == null) {
          preventFixed = false;
        }
        if (!preventFixed) {
          if (this.height === viewportHeight) {
            if (scrollTop < this.top + this.parentHeight - this.height) {
              return this.setPosition('fixed', 'north');
            }
            return this.setPosition('absolute', 'south');
          } else if (this.height < viewportHeight) {
            if (scrollTop >= this.top && scrollTop < this.top + this.parentHeight - this.height) {
              return this.setPosition('fixed', 'north');
            }
            return this.setPosition('absolute', 'south');
          }
          if (this.height > viewportHeight && this.height < this.parentHeight && (scrollTop + viewportHeight) >= (this.top + this.height) && (scrollTop + viewportHeight) < (this.parentHeight + this.top)) {
            return this.setPosition('fixed', 'south');
          }
        }
        if ((scrollTop + viewportHeight) >= this.bottom && this.height >= viewportHeight) {
          return this.setPosition('absolute', 'south');
        }
        return this.setPosition('absolute', 'north');
      };

      Column.prototype.destroy = function() {
        return this.setPosition();
      };

      return Column;

    })(Base);
    FeedItem = (function(_super) {

      __extends(FeedItem, _super);

      FeedItem.prototype.requires = ['columnSelector'];

      FeedItem.prototype.active = false;

      FeedItem.prototype.columns = [];

      function FeedItem($el, settings, index, parent) {
        this.$el = $el;
        this.settings = settings;
        this.index = index;
        this.parent = parent;
        FeedItem.__super__.constructor.apply(this, arguments);
        this.$columns = this.$el.find(this.settings.columnSelector);
        if (this.hasColumns()) {
          this.setDimensions();
          this.createColumns();
        }
        if (this.settings.additionalFeedItemInit) {
          this.settings.additionalFeedItemInit(this.$el, this.index);
        }
        this;

      }

      FeedItem.prototype.createColumns = function() {
        var column, _i, _j, _len, _len1, _ref, _ref1, _results;
        this.columns = this.$columns.map(function() {
          return new Column($(this));
        });
        _ref = this.columns;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          this.setColumnMargins(column);
        }
        _ref1 = this.columns;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          column = _ref1[_j];
          _results.push(column.setDimensions());
        }
        return _results;
      };

      FeedItem.prototype.setDimensions = function() {
        var height;
        this.marginTop = Number(this.$el.css('padding-top').replace('px', ''));
        this.marginBottom = Number(this.$el.css('padding-bottom').replace('px', ''));
        this.resetColumnPositioning();
        this.$el.css({
          height: 'auto'
        });
        height = this.$el.css('height');
        this.height = Number(height.replace('px', ""));
        this.$el.css({
          height: height
        });
        this.left = this.$el.offset().left;
        this.top = this.$el.offset().top;
        return this.bottom = this.top + this.height;
      };

      FeedItem.prototype.onScroll = function(scrollTop, viewportHeight, forceOnScroll) {
        var column, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results, _results1;
        if (viewportHeight >= this.height) {
          return this.active = false;
        } else if (scrollTop >= this.top && scrollTop < this.bottom) {
          this.active = true;
          _ref = this.columns;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            column = _ref[_i];
            _results.push(column.onScroll(scrollTop, viewportHeight, this.parent.settings.preventFixed));
          }
          return _results;
        } else if (this.active) {
          _ref1 = this.columns;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            column = _ref1[_j];
            column.onScroll(scrollTop, viewportHeight, true);
          }
          return this.active = false;
        } else if (forceOnScroll) {
          _ref2 = this.columns;
          _results1 = [];
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            column = _ref2[_k];
            _results1.push(column.onScroll(scrollTop, viewportHeight, true));
          }
          return _results1;
        }
      };

      FeedItem.prototype.recompute = function() {
        var column, _i, _j, _len, _len1, _ref, _ref1, _results;
        this.setDimensions();
        _ref = this.columns;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          this.setColumnMargins(column);
        }
        _ref1 = this.columns;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          column = _ref1[_j];
          _results.push(column.setDimensions());
        }
        return _results;
      };

      FeedItem.prototype.setColumnMargins = function(column) {
        return column.setMargins({
          parentHeight: this.height,
          marginTop: this.marginTop,
          marginBottom: this.marginBottom,
          marginLeft: this.left
        });
      };

      FeedItem.prototype.recomputeColumn = function(index) {
        if (!!this.columns[index]) {
          return;
        }
        return this.setColumnMargins(this.columns[index]);
      };

      FeedItem.prototype.resetColumnPositioning = function() {
        var column, _i, _len, _ref, _results;
        _ref = this.columns;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          _results.push(column.setPosition('static'));
        }
        return _results;
      };

      FeedItem.prototype.destroy = function() {
        var column, _i, _len, _ref, _results;
        _ref = this.columns;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          _results.push(column.destroy());
        }
        return _results;
      };

      FeedItem.prototype.hasColumns = function() {
        var _ref;
        return ((_ref = this.$columns) != null ? _ref.length : void 0) > 1;
      };

      return FeedItem;

    })(Base);
    Feed = (function(_super) {

      __extends(Feed, _super);

      Feed.prototype.feedItems = [];

      Feed.prototype.requires = ['feedItems'];

      Feed.prototype.hasFocus = true;

      Feed.prototype.scrollSpeedThreshold = 500;

      Feed.prototype.defaults = {
        active: true,
        rendered: false,
        preventFixed: false
      };

      function Feed(el, settings) {
        var _ref;
        this.el = el;
        this.settings = settings;
        this.$el = $(this.el);
        if (this.settings == null) {
          throw "You must pass settings";
        }
        if (((_ref = this.$el) != null ? _ref.length : void 0) !== 1) {
          throw "PopLockIt must be called on one element";
        }
        Feed.__super__.constructor.call(this, this.$el, this.settings);
        this.$window = $(window);
        this.settings = $.extend(this.defaults, this.settings);
        this.settings.active = true;
        this.initRequestAnimationFrame();
        this.viewportHeight = this.$window.outerHeight(true);
        this.$el.css({
          'box-sizing': 'border-box',
          overflow: 'hidden'
        });
        this.addFeedItems(this.settings.feedItems);
        this.requestAnimationFrame();
        this;

      }

      Feed.prototype.onScroll = function() {
        var item, scrollTop, _i, _len, _ref,
          _this = this;
        if (!this.settings.active) {
          return;
        }
        scrollTop = this.$window.scrollTop();
        if (scrollTop === this.previousScrollTop) {
          return this.requestedAnimationFrame = window.requestAnimationFrame((function() {
            return _this.onScroll();
          }));
        }
        _ref = this.feedItems;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          item.onScroll(scrollTop, this.viewportHeight, Math.abs(scrollTop - this.previousScrollTop) > this.scrollSpeedThreshold);
        }
        this.previousScrollTop = scrollTop;
        if (this.settings.onScroll != null) {
          this.settings.onScroll(scrollTop);
        }
        return this.requestAnimationFrame();
      };

      Feed.prototype.recompute = function() {
        var feedItem, item, scrollTop, _i, _j, _len, _len1, _ref, _ref1, _results;
        this.settings.active = true;
        _ref = this.feedItems;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          feedItem = _ref[_i];
          feedItem.recompute();
        }
        scrollTop = this.$window.scrollTop();
        _ref1 = this.feedItems;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          _results.push(item.onScroll(scrollTop, this.viewportHeight, false));
        }
        return _results;
      };

      Feed.prototype.recomputeItem = function(index) {
        if (!this.feedItems[index]) {
          return;
        }
        return this.feedItems[index].recompute();
      };

      Feed.prototype.recomputeItemColumn = function(index, columnIndex) {
        if (!this.feedItems[index]) {
          return;
        }
        return this.feedItems[index].recomputeColumn(columnIndex);
      };

      Feed.prototype.destroy = function() {
        var item, _i, _len, _ref;
        this.settings.rendered = false;
        this.settings.active = false;
        $.data(this.$el, "plugin_" + pluginName, false);
        if (typeof feedItems !== "undefined" && feedItems !== null ? feedItems.length : void 0) {
          _ref = this.feedItems;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            item.destroy();
          }
        }
        return this.feedItems = [];
      };

      Feed.prototype.stop = function() {
        this.settings.active = false;
        return window.cancelAnimationFrame(this.requestedAnimationFrame);
      };

      Feed.prototype.start = function() {
        var _this = this;
        this.settings.active = true;
        window.cancelAnimationFrame(this.requestedAnimationFrame);
        return this.requestedAnimationFrame = window.requestAnimationFrame((function() {
          return _this.onScroll();
        }));
      };

      Feed.prototype.addFeedItems = function($feedItems) {
        var _this = this;
        if (!(($feedItems != null) && $feedItems.length)) {
          throw "You must pass $feedItems";
        }
        return $feedItems.map(function(index, el) {
          return _this.feedItems.push(new FeedItem($(el), _this.settings, index, _this));
        });
      };

      Feed.prototype.requestAnimationFrame = function() {
        var _this = this;
        return this.requestedAnimationFrame = window.requestAnimationFrame((function() {
          return _this.onScroll();
        }));
      };

      Feed.prototype.debounce = function(func, wait) {
        var timeout;
        timeout = 0;
        return function() {
          var args, throttler,
            _this = this;
          args = arguments;
          throttler = function() {
            timeout = null;
            return func(args);
          };
          clearTimeout(timeout);
          return timeout = setTimeout(throttler, wait);
        };
      };

      Feed.prototype.initRequestAnimationFrame = function() {
        var lastTime, vendor, vendors, _i, _len;
        if (window.requestAnimationFrame) {
          return;
        }
        lastTime = 0;
        vendors = ['ms', 'moz', 'webkit', 'o'];
        for (_i = 0, _len = vendors.length; _i < _len; _i++) {
          vendor = vendors[_i];
          if (!(!window.requestAnimationFrame)) {
            continue;
          }
          window.requestAnimationFrame = window["" + vendor + "RequestAnimationFrame"];
          window.cancelAnimationFrame = window["{vendor}CancelAnimationFrame"] || window["{vendors}CancelRequestAnimationFrame"];
        }
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function(callback, element) {
            var currTime, id, timeToCall;
            currTime = new Date().getTime();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            id = window.setTimeout((function() {
              return callback(currTime + timeToCall);
            }), timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          };
        }
        if (!window.cancelAnimationFrame) {
          return window.cancelAnimationFrame = function(id) {
            return clearTimeout(id);
          };
        }
      };

      return Feed;

    })(Base);
    return $.fn[pluginName] = function(options) {
      if (!$.data(this, "plugin_" + pluginName)) {
        if (options == null) {
          throw "You must pass settings";
        }
        return $.data(this, "plugin_" + pluginName, new Feed(this, options));
      } else if ($.data(this, "plugin_" + pluginName)[options] != null) {
        return $.data(this, "plugin_" + pluginName)[options](Array.prototype.slice.call(arguments, 1)[0], Array.prototype.slice.call(arguments, 1)[1]);
      } else {
        throw "Method '" + options + "' does not exist on jQuery.popLockIt";
      }
    };
  })(jQuery, window, document);

}).call(this);
