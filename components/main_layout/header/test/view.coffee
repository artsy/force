rewire    = require 'rewire'
benv      = require 'benv'
Backbone  = require 'backbone'
sinon     = require 'sinon'
mediator  = require '../../../../lib/mediator.coffee'

HeaderView = rewire '../view'
HeaderView.__set__ 'SearchBarView', Backbone.View
HeaderView.__set__ 'AuthModalView', sinon.stub()
HeaderView.__set__ 'readCookie', sinon.stub()
HeaderView.__set__ 'createCookie', sinon.stub()

{ resolve } = require 'path'

describe 'HeaderView', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        sd: { HIDE_HEADER: false }
      Backbone.$ = $
      benv.render resolve(__dirname, '../templates/index.jade'), {}, =>
        @view = new HeaderView
          el: $('#main-layout-header')
          $window: @$window =
            on: sinon.stub()
            off: sinon.stub()
            scrollTop: -> 55
          $body: $('body')
        done()

  after -> benv.teardown()

  it 'hides the welcome header on scroll', ->
    @$window.on.args[0][0].should.equal 'scroll.welcome-header'
    @$window.on.args[0][1].should.equal @view.checkRemoveWelcomeHeader

  describe '#hideWelcomeHeader', ->
    beforeEach ->
      @view.$welcomeHeader = height: (-> 50), remove: sinon.stub()

    it 'hides the welcome header when scrolling past the search bar', ->
      @view.$window.scrollTop = -> 55
      @view.checkRemoveWelcomeHeader()
      $('body').hasClass('body-header-fixed').should.be.ok
      @view.$window.off.called.should.be.ok

  describe '#openAuth', ->
    it 'opens with custom copy', ->
      @view.openAuth copy: 'Sign up to foo bar'
      HeaderView.__get__('AuthModalView').args[0][0].copy.should.include 'Sign up to foo bar'

  describe '#login', ->
    it 'triggers the mediator', ->
      spy = sinon.spy mediator, 'trigger'
      @view.$('.mlh-login').click()
      spy.args[0][0].should.equal 'open:auth'
      spy.args[0][1].mode.should.equal 'login'
      mediator.trigger.restore()

  describe '#signup', ->
    it 'triggers the mediator', ->
      spy = sinon.spy mediator, 'trigger'
      @view.$('.mlh-signup').click()
      spy.args[0][0].should.equal 'open:auth'
      spy.args[0][1].mode.should.equal 'signup'
      mediator.trigger.restore()
