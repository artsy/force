(function() {
  'use strict';

  var should, benv;

  benv    = require('benv'),
  should  = require('should');

  beforeEach(function(done) {
    benv.setup(function() {
      benv.expose({
        jQuery: require('jquery'), $: require('jquery')
      });

      document = {
        createElement: function(name) {
          return {
            style: {
              WebkitTransition: function() {
                 return 'webkitTransitionEnd';
              }
            }
          };
        }
      };

      require('../index.js');

      done();
    });
  });

  afterEach(function() {
    benv.teardown();
  });

  describe('jquery.transition', function() {
    it('should be defined on jQuery support object', function() {
      $.support.transition.should.have.property('end', 'webkitTransitionEnd');
    });

    it('simulates a transition ending on a DOM element', function(done) {
      var $div;
      $div = $('<div></div>');
      $div.on($.support.transition.end, function() {
        true.should.be.ok;
        done();
      }).emulateTransitionEnd(0);
    });
  });
})();
