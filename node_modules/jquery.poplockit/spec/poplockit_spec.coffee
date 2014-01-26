describe "$.fn.popLockIt", ->

  it "should be chainable", ->
    item = $el.popLockIt
      columnSelector  : '.column'
      feedItems       : $el.children()
      onScroll        : (-> )
      preventFixed    : false
      additionalFeedItemInit: (-> )

    $el.should == item

  it "should require settings to be passed in", ->
    expect( -> $el.popLockIt()).toThrow new Error("You must pass settings")

  it "should require being called on one element", ->
    expect( -> $.fn.popLockIt(
      feedItems      : $el.children()
      columnSelector : '.column'
    )).toThrow new Error("PopLockIt must be called on one element")

  it "should require being called on one element", ->
    $("<div class='test-container'><div class='feeditem'><div class='column'></div><div class='column'></div></div></div>").appendTo('body')
    $("<div class='test-container'><div class='feeditem'><div class='column'></div><div class='column'></div></div></div>").appendTo('body')
    window.$el = $('.test-container')
    expect( -> $el.popLockIt(
      feedItems      : $el.children()
      columnSelector : '.column'
    )).toThrow new Error("PopLockIt must be called on one element")

  it "should raise error on invalid method", ->
    $el.popLockIt
      feedItems      : $el.children()
      columnSelector : '.column'
    expect( -> $el.popLockIt('invalid')).toThrow new Error("Method 'invalid' does not exist on jQuery.popLockIt")
