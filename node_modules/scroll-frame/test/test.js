var app = require('../example/server');
var Browser = require('zombie');
var sinon = require('sinon');
var server, browser;

beforeEach(function(done) {
  server = app.listen(5000, function() {
    browser = new Browser();
    browser.visit('http://localhost:5000', function() {
      done();
    });
  });
});

afterEach(function() {
  server.close();
});

describe('scrollFrame', function() {

  it('adds an iframe to the body when clicking a scoped link', function(done) {
    browser.wait(function() {
      browser.window.Array = Array;
      browser.window.Array.prototype.filter = function(cb) {
        return [function(){}]
      }
      browser.clickLink('li:nth-child(6) a', function() {
        browser.html().should
          .containEql('<iframe class="scroll-frame-iframe"')
        done();
      });
    });
  });

  xit('removes the iframe when going back', function(done) {
    browser.wait(function() {
      browser.window.Array = Array;
      browser.window.Array.prototype.filter = function(cb) {
        return [function(){}]
      }
      browser.clickLink('li:nth-child(6) a', function() {
        browser.html().should
          .containEql('<iframe class="scroll-frame-iframe"')
        browser.back(function() {
          browser.html().should.not
            .containEql('<iframe class="scroll-frame-iframe"')
          done();
        });
      });
    });
  });

  // TODO: Use benv (https://github.com/artsy/benv) to unit test this
  xit('does not try to refresh the page in accomodation of a deep iframe unless ' +
      'the message involves scrollFrame: true and an href thats not the previous');
});