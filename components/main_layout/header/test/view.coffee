_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
mediator = require '../../../../lib/mediator.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'

{ resolve } = require 'path'

describe 'HeaderView', ->

  before (done) ->
    benv.setup =>
      @user = new CurrentUser fabricate('user')
      benv.expose
        $: benv.require('jquery')
      Backbone.$ = $
      done()

  after -> benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    sinon.stub $, 'ajax'
    sd = { HIDE_HEADER: false, CURRENT_USER: @user }
    benv.render resolve(__dirname, '../templates/index.jade'), { sd: sd, user: @user }, =>
      @HeaderView = benv.requireWithJadeify(
          resolve(__dirname, '../view')
          ['bundleTemplate']
        )
      @HeaderView.__set__ 'SearchBarView', Backbone.View
      @HeaderView.__set__ 'AuthModalView', sinon.stub()
      @HeaderView.__set__ 'FlashMessage', sinon.stub()
      @HeaderView.__set__ 'sd', sd
      @view = new @HeaderView
        el: $('#main-layout-header')
        $window: @$window =
          on: sinon.stub()
          off: sinon.stub()
          scrollTop: -> 55
        $body: $('body')
      done()

  afterEach ->
    Backbone.sync.restore()
    $.ajax.restore()

  describe '#openAuth', ->
    it 'opens with custom copy', ->
      @view.openAuth copy: 'Sign up to foo bar'
      @HeaderView.__get__('AuthModalView').args[0][0].copy.should.containEql 'Sign up to foo bar'

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

  describe 'with flash message', ->
    before (done) ->
      benv.render resolve(__dirname, '../templates/index.jade'), {}, =>
        $.support.transition = { end: 'transitionend' }
        $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
        @HeaderView = rewire '../view'
        @HeaderView.__set__ 'SearchBarView', Backbone.View
        @HeaderView.__set__ 'AuthModalView', sinon.stub()
        @HeaderView.__set__ 'FlashMessage', sinon.stub()
        @HeaderView.__set__ 'sd', FLASH: 'Goodbye world.'
        @triggerSpy = sinon.spy mediator, 'trigger'
        @view = new @HeaderView
          el: $('#main-layout-header')
          $window: @$window =
            on: sinon.stub()
            off: sinon.stub()
            scrollTop: -> 55
          $body: $('body')
        done()

    it 'checks for flash messages initializes the flash message', ->
      @HeaderView.__get__('FlashMessage').args[0][0].message.should.equal 'Goodbye world.'

  describe '#checkForNotifications', ->

    it 'sets the notification count and renders the hover pulldown', ->
      @view.checkForNotifications()
      $.ajax.called.should.be.true()
      $.ajax.args[0][0].success
        total_unread: 10
        feed: [
          actors: "Kana"
          message: "1 Work Added"
          status: "unread"
          date: "2015-08-04T16:44:28.000Z"
          object: fabricate('artwork', { images: [ image_urls: square: 'http://foo.jpg'] })
        ]
      $('.mlh-bundle-count').text().should.containEql '10'
      $('.bundle-message').text().should.containEql '1 Work Added'
      $('.bundle-actors').text().should.containEql 'Kana'
      $('.bundle-date').text().should.containEql 'Aug 4'
      $('#hpm-bundles a')[0].href.should.containEql 'artist_id=andy-warhol'

    it 'disables the hover-pulldown when there are no notifications', ->
      @view.checkForNotifications()
      $.ajax.args[0][0].success
        total_unread: 0
        feed: []
      $('.mlh-notification').hasClass('nohover').should.be.true()

    it 'sets bundle count to 99+ when there are more than 100 unread notifications', ->
      @view.checkForNotifications()
      $.ajax.args[0][0].success
        total_unread: 120
        feed: []
      $('.mlh-bundle-count').text().should.containEql '99+'