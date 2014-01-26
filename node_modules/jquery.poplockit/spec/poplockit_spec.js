(function() {

  describe("$.fn.popLockIt", function() {
    it("should be chainable", function() {
      var item;
      item = $el.popLockIt({
        columnSelector: '.column',
        feedItems: $el.children(),
        onScroll: (function() {}),
        preventFixed: false,
        additionalFeedItemInit: (function() {})
      });
      return $el.should === item;
    });
    it("should require settings to be passed in", function() {
      return expect(function() {
        return $el.popLockIt();
      }).toThrow(new Error("You must pass settings"));
    });
    it("should require being called on one element", function() {
      return expect(function() {
        return $.fn.popLockIt({
          feedItems: $el.children(),
          columnSelector: '.column'
        });
      }).toThrow(new Error("PopLockIt must be called on one element"));
    });
    it("should require being called on one element", function() {
      $("<div class='test-container'><div class='feeditem'><div class='column'></div><div class='column'></div></div></div>").appendTo('body');
      $("<div class='test-container'><div class='feeditem'><div class='column'></div><div class='column'></div></div></div>").appendTo('body');
      window.$el = $('.test-container');
      return expect(function() {
        return $el.popLockIt({
          feedItems: $el.children(),
          columnSelector: '.column'
        });
      }).toThrow(new Error("PopLockIt must be called on one element"));
    });
    return it("should raise error on invalid method", function() {
      $el.popLockIt({
        feedItems: $el.children(),
        columnSelector: '.column'
      });
      return expect(function() {
        return $el.popLockIt('invalid');
      }).toThrow(new Error("Method 'invalid' does not exist on jQuery.popLockIt"));
    });
  });

}).call(this);
