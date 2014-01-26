(function() {

  beforeEach(function() {
    $("<div id='test-container'><div class='feeditem'><div class='column'></div><div class='column'></div></div></div>").appendTo('body');
    return window.$el = $('#test-container');
  });

  afterEach(function() {
    return $('#test_container').remove();
  });

}).call(this);
