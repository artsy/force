(function() {
  var App;

  App = {
    defaults: {
      numberItems: 20,
      numberColumns: 6,
      kittenHeight: 400,
      columnPadding: 20
    },
    initialize: function() {
      this.columnWidth = this.getColumnWidth();
      return $('body').html("<div class='container'>" + (this.generateFeedHtml()) + "</div>").find('.container').popLockIt({
        feedItems: $('body .container > ul'),
        columnSelector: '> ul'
      });
    },
    getColumnWidth: function() {
      return Math.floor($('body').width() / this.defaults.numberColumns / 10) * 10 - 40;
    },
    generateFeedHtml: function() {
      var _i, _ref, _results,
        _this = this;
      return (function() {
        _results = [];
        for (var _i = 1, _ref = this.defaults.numberItems; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function() {
        var _i, _ref, _results;
        return "<ul>" + (function() {
          _results = [];
          for (var _i = 1, _ref = _this.defaults.numberColumns; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this).map(function() {
          return _this.generateKittensHtml(Math.ceil(1 + (Math.random() * 6)));
        }).join('') + "</ul>";
      }).join('');
    },
    generateKittensHtml: function(num) {
      var _i, _results,
        _this = this;
      return ("<ul style='width: " + this.columnWidth + "px'>") + (function() {
        _results = [];
        for (var _i = 1; 1 <= num ? _i <= num : _i >= num; 1 <= num ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function() {
        var height, width;
        height = Math.ceil((50 + (Math.random() * 300)) / 10) * 10;
        width = _this.columnWidth - _this.defaults.columnPadding;
        return "<li style='width: " + width + "px'><img height='" + height + "' width='" + width + "' src='http://placekitten.com/" + width + "/" + height + "'></li>";
      }).join('') + "</ul>";
    }
  };

  $(function() {
    return App.initialize();
  });

}).call(this);
