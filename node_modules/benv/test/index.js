var benv = require('../');
var should = require('should');

describe('benv.setup', function() {

  it('exposes browser globals', function(done) {
    benv.setup(function(){
      should.exist(navigator.userAgent);
      should.exist(document);
      btoa.should.be.type('function');
      done();
    });
  });

  it('exposes passed globals', function(done) {
    benv.setup(function(){
      benv.expose({ App: { Models: {} } });
      should.exist(App.Models);
      done();
    });
  });
});

describe('benv.teardown', function() {

  it('removes globals', function(done) {
    benv.setup(function(){
      should.exist(navigator);
      benv.teardown();
      (typeof navigator).should.equal('undefined');
      done();
    });
  });

  it('doesnt have to remove DOM globals', function(done) {
    benv.setup(function(){
      should.exist(navigator);
      benv.teardown(false);
      (typeof navigator).should.not.equal('undefined');
      done();
    });
  });
});

describe('benv.teardown retaining the document', function() {

  beforeEach(function(done) {
    benv.setup(function(){
      benv.expose({
        $: require('./libs/jquery.js')
      });
      done();
    });
  });

  afterEach(function() {
    benv.teardown(false);
  });

  it('add html to the body', function(done) {
    $('body').html('You guys do great work');
    document.getElementsByTagName('body')[0].innerHTML.should.equal($('body').html());
    done();
  });

  it('previous document still intact', function(done) {
    document.getElementsByTagName('body')[0].innerHTML.should.equal($('body').html());
    done();
  });

});

describe('benv.require', function() {

  it('can require a non-commonjs module', function(done) {
    benv.setup(function(){
      var $ = benv.require('./libs/zepto.js', 'Zepto');
      should.exist($.ajax);
      done();
    });
  });

  it('can require a non-commonjs module that doesnt even export to window', function(done) {
    benv.setup(function(){
      var nowin = benv.require('./libs/no-window.js', 'NoWindow');
      nowin().should.include("I don't even explicitly export to window");
      done();
    });
  });

  it('can require from node_modules', function(done) {
    benv.setup(function(){
      var mocha = benv.require('mocha');
      should.exist(mocha.reporters);
      done();
    });
  });
});


describe('benv.render', function() {

  it('renders jade templates', function(done) {
    benv.setup(function(){
      var $ = benv.require('./libs/zepto.js', 'Zepto');
      benv.render(__dirname + '/libs/template.jade', {}, function() {
        $('body').html().should.include('Hello World')
        done();
      });
    });
  });

  it('renders just the body from the template', function(done) {
    benv.setup(function(){
      var $ = benv.require('./libs/zepto.js', 'Zepto');
      benv.render(__dirname + '/libs/template.jade', {}, function() {
        $('body').html().should.equal('<h1>Hello World</h1><h2>Ima Template</h2>');
        done();
      });
    });
  });

  it('removes script tags', function(done) {
    benv.setup(function(){
      var $ = benv.require('./libs/zepto.js', 'Zepto');
      benv.render(__dirname + '/libs/template.jade', {}, function() {
        $('body').html().should.not.include('script');
        done();
      });
    });
  });

  it('accepts local paths', function(done) {
    benv.setup(function(){
      var $ = benv.require('./libs/zepto.js', 'Zepto');
      benv.render('../test/libs/template.jade', {}, function() {
        $('body').html().should.not.include('script');
        done();
      });
    });
  });
});

describe('benv.requireWithJadeify', function() {

  it('rewires jadeify templates to work in node', function() {
    var html = benv.requireWithJadeify('./libs/jadeify.js', ['tmpl'])();
    html.should.include('A foo walks into a bar');
  });

  it('works with double quotes', function() {
    var html = benv.requireWithJadeify('./libs/jadeify-double-quotes.js', ['tmpl'])();
    html.should.include('A foo walks into a bar');
  });
});