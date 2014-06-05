_               = require 'underscore'
sd              = require('sharify').data
benv            = require 'benv'
sinon           = require 'sinon'
Backbone        = require 'backbone'
rewire          = require 'rewire'
{ resolve }     = require 'path'
mediator        = require '../../../lib/mediator'
LoggedOutUser   = require '../../../models/logged_out_user'

describe 'Questionnaire', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end

      @Questionnaire = benv.requireWithJadeify resolve(__dirname, '../questionnaire'), [
        'templateMap.initial', 'templateMap.questionnaire', 'templateMap.signup', 'templateMap.login'
      ]

      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub _, 'delay', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    sinon.stub @Questionnaire::, 'attachLocationSearch'
    sinon.stub @Questionnaire::, 'attachBookmarksView'
    sinon.stub @Questionnaire::, 'close'
    sinon.stub(@Questionnaire::, 'modalTemplate').returns('<div class="modal-body"></div>')

    @viewOptions =
      transition : 'slide'
      width      : '450px'
      backdrop   : false
      user       : new LoggedOutUser
      inquiry    : new Backbone.Model session_id: 'xxx'
      loggedIn   : true

  afterEach ->
    _.delay.restore()
    Backbone.sync.restore()
    @view.attachLocationSearch.restore()
    @view.attachBookmarksView.restore()
    @view.modalTemplate.restore()
    @view.close.restore()
    mediator.off null, null, this

  describe 'logged out', ->
    it 'has the initial state as signup', ->
      @view = new @Questionnaire @viewOptions
      @view.state.get('mode').should.equal 'signup'

    describe '#auth', ->
      describe 'signup mode', ->
        beforeEach ->
          @view.state.set mode: 'signup'

        it 'sets the button state to loading', ->
          @view.$('form').submit()
          @view.$('button').attr('data-state').should.equal 'loading'

        it 'sets the data from the form on the user model', ->
          @view.$('input[name="password"]').val 'secret'
          @view.$('form').submit()
          @view.user.get('password').should.equal 'secret'

        it 'signs up the user', ->
          @view.$('form').submit()
          _.last(Backbone.sync.args)[0].should.equal 'create'
          _.last(Backbone.sync.args)[2].url.should.equal '/users/invitation/accept'

      describe 'login mode', ->
        beforeEach ->
          @view.state.set mode: 'login'

        it 'sets the button state to loading', ->
          @view.$('form').submit()
          @view.$('button').attr('data-state').should.equal 'loading'

        it 'sets the data from the form on the user model', ->
          @view.$('input[name="password"]').val 'secret'
          @view.$('form').submit()
          @view.user.get('password').should.equal 'secret'

        it 'logs in the user', ->
          @view.$('form').submit()
          _.last(Backbone.sync.args)[0].should.equal 'create'
          _.last(Backbone.sync.args)[2].url.should.equal '/users/sign_in'

      describe 'either mode', ->
        beforeEach ->
          @view.state.set mode: 'signup'

        it 'allows the user to skip this whole thing, sending the inquiry and closing the modal', (done) ->
          mediator.on 'inquiry:send', done, this
          @view.$('#auth-skip').click()
          @view.close.called.should.be.true

    describe '#authError', ->
      beforeEach ->
        @view.state.set mode: 'signup'

      it 'put the button into an error state, and display an error message', ->
        @view.authError()
        @view.$('button').attr('data-state').should.equal 'error'
        @view.$('.auth-errors').text().should.equal 'There was an error'

    describe '#authSuccess', ->
      beforeEach ->
        @view.state.set mode: 'signup'
        # Is returned from the server nested in a `user` key
        user = new Backbone.Model user: name: 'Foo Bar', accessToken: 'secret'
        @view.user.set id: 'foobar', name: 'Bar Baz', password: 'alsosecret'
        @view.authSuccess user

      it 'sets the attributes it receives back on the model onto the view user, without overriding existing ones', ->
        @view.user.get('name').should.equal 'Bar Baz'
        @view.user.get('accessToken').should.equal 'secret'

      it 'unsets the user password so that it isnt sent to the server on subsequent saves (which would error)', ->
        @view.user.has('password').should.be.false

      it 'unsets the session_id because now it will be sent with an actual user', ->
        @view.inquiry.has('session_id').should.be.false

      it 'sets needsOnboarding if mode is signup', ->
        @view.user.needsOnboarding.should.be.true

      it 'sets the mode to initial', ->
        @view.state.get('mode').should.equal 'initial'

      describe 'mode is login', ->
        beforeEach ->
          @view.state.set mode: 'login'
          @view.authSuccess new Backbone.Model

        it 'does not set needsOnboarding on the user', ->
          @view.user.needsOnboarding.should.be.false

    describe '#toggleMode', ->
      it 'should be able to set the mode to an arbitrary value based on a links data-mode', ->
        @view.state.set mode: 'signup'
        @view.$('a[data-mode="login"]').click()
        @view.state.get('mode').should.equal 'login'

  describe 'logged in', ->
    beforeEach ->
      @viewOptions.user.set id: 'foobar'
      @view = new @Questionnaire @viewOptions
      @view.user.set id: 'foobar'

    describe '#initialize', ->
      it 'should start at the first step', ->
        @view.state.get('mode').should.equal 'initial'
        html = @view.$el.html()
        html.should.include 'One question to serve you better'
        html.should.include 'Have you ever bought art through a gallery or auction before?'

      it 'geolocates the user', ->
        Backbone.sync.args[0][2].url.should.equal 'https://freegeoip.net/json/'

    describe '#advance', ->
      describe 'collector level 3', ->
        it 'should advance to the next state on click and have the correct copy', ->
          @view.$('a').first().click()
          @view.attachLocationSearch.called.should.be.true
          @view.state.get('mode').should.equal 'questionnaire'
          html = @view.$el.html()
          html.should.include 'Great. Final Step'

      describe 'collector level 2', ->
        it 'should advance to the next state on click and have the correct copy', ->
          @view.$('a').last().click()
          @view.attachLocationSearch.called.should.be.true
          @view.state.get('mode').should.equal 'questionnaire'
          html = @view.$el.html()
          html.should.include 'OK. Final Step'

    describe '#done', ->
      beforeEach ->
        @view.state.set mode: 'questionnaire'

      it 'sets the data from the form on the user model', ->
        @view.$('input[name="name"]').val 'Foo Bar'
        @view.$('input[name="profession"]').val 'Human Being'
        @view.$('form').submit()
        @view.user.get('name').should.equal 'Foo Bar'
        @view.user.get('profession').should.equal 'Human Being'

      it 'sets the button state to loading', ->
        @view.$('form').submit()
        @view.$('button').attr('data-state').should.equal 'loading'

      it 'triggers the inquiry to send', (done) ->
        mediator.on 'inquiry:send', done, this
        @view.$('form').submit()

      it 'persists the user model', ->
        @view.$('input[name="name"]').val 'Foo Bar'
        @view.$('input[name="profession"]').val 'Human Being'
        @view.$('form').submit()
        _.last(Backbone.sync.args)[0].should.equal 'update'
        _.last(Backbone.sync.args)[1].changed.should.eql name: 'Foo Bar', profession: 'Human Being'
        _.last(Backbone.sync.args)[1].url().should.include '/api/v1/me'

      it 'refreshes the user on success', ->
        @view.$('form').submit()
        _.last(Backbone.sync.args)[2].success()
        _.last(Backbone.sync.args)[2].url.should.equal '/user/refresh'

      it 'closes the modal on success', ->
        @view.$('form').submit()
        _.last(Backbone.sync.args)[2].success()
        @view.close.called.should.be.true
