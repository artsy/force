HeaderView = require '../view'
benv = require 'benv'
Backbone = require 'backbone'
cheerio = require 'cheerio'
sinon = require  'sinon'

describe 'HeaderView', ->

  beforeEach (done) ->
    benv.setup =>
      Backbone.$ = cheerio.load(document.documentElement.innerHTML) 
      benv.render '../template.jade', {}, =>
        @view = new HeaderView $window: @$window =
          on: sinon.stub()
          off: sinon.stub()
        done()

  it 'hides the welcome header on scroll', ->
    @$window.on.args[0][0].should.equal 'scroll'
    @$window.on.args[0][1].should.equal @view.hideWelcomeHeader

  describe '#hideWelcomeHeader', ->

    it 'hides the welcome header when scrolling past the search bar', ->
      @view.$welcomeHeader = height: (-> 50), hide: sinon.stub()
      @view.$window.scrollTop = -> 55
      @view.hideWelcomeHeader()
      @view.$welcomeHeader.hide.called.should.be.ok
      @view.$window.off.called.should.be.ok