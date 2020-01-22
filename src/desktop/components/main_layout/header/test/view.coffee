_ = require 'underscore'
rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
mediator = require '../../../../lib/mediator.coffee'
CurrentUser = require '../../../../models/current_user'
{ fabricate } = require '@artsy/antigravity'

{ resolve } = require 'path'

describe 'HeaderView', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
      Backbone.$ = $
      @Cookies = require '../../../cookies/index.coffee'
      done()

  after -> benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @sd = { HEADER_CLASS: 'stub' }
    benv.render resolve(__dirname, '../templates/index.jade'), { sd: @sd }, =>
      @HeaderView = benv.requireWithJadeify(
        resolve(__dirname, '../view')
        ['bundleTemplate']
      )
      @HeaderView.__set__ 'SearchBarView', Backbone.View
      @HeaderView.__set__ 'AuthModalView', sinon.stub()
      @HeaderView.__set__ 'FlashMessage', sinon.stub()
      @HeaderView.__set__ 'sd', @sd
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

  describe '#checkForNotifications', ->

    before (done) ->
      @user = new CurrentUser fabricate('user')
      @user.type = 'Admin'
      sd = { CURRENT_USER: @user}
      benv.render resolve(__dirname, '../templates/index.jade'), { sd: sd }, =>
        @HeaderView = benv.requireWithJadeify(
          resolve(__dirname, '../view')
          ['bundleTemplate']
        )
        @HeaderView.__set__ 'CurrentUser', { orNull: => @user }
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

    it 'sets the notification count and renders the hover pulldown', ->
      @view.checkForNotifications()
      Backbone.sync.args[0][2].success
        total_unread: 10
        feed: [
          actors: "Kana"
          message: "1 Work Added"
          status: "viewed"
          date: "2015-08-04T16:44:28.000Z"
          object: fabricate('artwork', { images: [ image_urls: square: 'http://foo.jpg'] })
        ]
      @view.$('.mlh-bundle-count').text().should.containEql '10'
      @view.$('.bundle-message').text().should.containEql '1 Work Added'
      @view.$('.bundle-actors').text().should.containEql 'Kana'
      @view.$('.bundle-date').text().should.containEql 'Aug 4'
      @view.$('#hpm-bundles a')[0].href.should.containEql 'artist_id=andy-warhol'
      @view.$('.bundle-information').html().should.containEql 'bundle-read-status'
      @Cookies.set.should.be.calledOnce

    it 'disables the hover-pulldown when there are no notifications', ->
      @view.checkForNotifications()
      Backbone.sync.args[0][2].success
        total_unread: 0
        feed: []
      @view.$('.mlh-notification').hasClass('nohover').should.be.true()

    it 'sets bundle count to 99+ when there are more than 100 unread notifications', ->
      @view.checkForNotifications()
      Backbone.sync.args[0][2].success
        total_unread: 120
        feed: [
          actors: "Kana"
          message: "1 Work Added"
          status: "unread"
          date: "2015-08-04T16:44:28.000Z"
          object: fabricate('artwork', { images: [ image_urls: square: 'http://foo.jpg'] })
        ]
      @view.$('.mlh-bundle-count').text().should.containEql '99+'
