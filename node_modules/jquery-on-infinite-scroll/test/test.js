var benv = require('benv');

beforeEach(function(done) {
  benv.setup(function() {
    benv.expose({ $: require('jquery'), jQuery: require('jquery') });
    require('../index');
    done();
  });
});

afterEach(function() {
  benv.teardown();
});

describe('onInfiniteScroll', function() {

  it('uses the callback when you have scrolled to the bottom', function(done) {
    $.onInfiniteScroll(function() {
      done()
    });
    $.fn.scrollTop = function() { return 200 };
    $.fn.height = function() { return 100 };
    $(window).trigger('scroll');
  });

});