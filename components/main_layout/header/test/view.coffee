rewire    = require 'rewire'
benv      = require 'benv'
Backbone  = require 'backbone'
sinon     = require 'sinon'
mediator  = require '../../../../lib/mediator.coffee'

HeaderView = rewire '../view'
HeaderView.__set__ 'SearchBarView', sinon.stub()
HeaderView.__set__ 'AuthModalView', sinon.stub()

{ resolve } = require 'path'

describe 'HeaderView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      benv.render resolve(__dirname, '../template.jade'), {}, =>
        @view = new HeaderView
          el: $('#main-layout-header')
          $window: @$window =
            on: sinon.stub()
            off: sinon.stub()
          $body: $('body')
        done()

  it 'hides the welcome header on scroll', ->
    @$window.on.args[0][0].should.equal 'scroll.welcome-header'
    @$window.on.args[0][1].should.equal @view.hideWelcomeHeader

  describe '#hideWelcomeHeader', ->
    it 'hides the welcome header when scrolling past the search bar', ->
      @view.$welcomeHeader = height: (-> 50), hide: sinon.stub()
      @view.$window.scrollTop = -> 55
      @view.hideWelcomeHeader()
      @view.$welcomeHeader.hide.called.should.be.ok
      @view.$window.off.called.should.be.ok

  # describe '#login', ->
  #   it 'triggers the mediator', ->
  #     spy = sinon.spy mediator, 'trigger'
  #     @view.$('.mlh-login').click()
  #     spy.args[0][0].should.equal 'open:auth'
  #     spy.args[0][1].mode.should.equal 'login'
  #     mediator.trigger.restore()

  # describe '#signup', ->
  #   it 'triggers the mediator', ->
  #     spy = sinon.spy mediator, 'trigger'
  #     @view.$('.mlh-signup').click()
  #     spy.args[0][0].should.equal 'open:auth'
  #     spy.args[0][1].mode.should.equal 'signup'
  #     mediator.trigger.restore()
