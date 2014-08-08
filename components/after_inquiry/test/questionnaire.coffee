_ = require 'underscore'
sd = require('sharify').data
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
{ resolve } = require 'path'
mediator = require '../../../lib/mediator'
LoggedOutUser = require '../../../models/logged_out_user'

describe 'Questionnaire', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end

      @Questionnaire = benv.requireWithJadeify resolve(__dirname, '../questionnaire'), [
        'templateMap.initial', 'templateMap.questionnaire', 'templateMap.signup', 'templateMap.login'
      ]

      sinon.stub _, 'delay', (cb) -> cb()
      sinon.stub Backbone, 'sync'
      sinon.stub @Questionnaire::, 'attachLocationSearch'
      sinon.stub @Questionnaire::, 'attachBookmarksView'
      sinon.stub @Questionnaire::, 'close'
      sinon.stub(@Questionnaire::, 'modalTemplate').returns('<div class="modal-body"></div>')

      @viewOptions =
        transition: 'slide'
        width: '450px'
        backdrop: false
        user: new LoggedOutUser
        inquiry: new Backbone.Model session_id: 'xxx'
        loggedIn: true

      @view = new @Questionnaire @viewOptions
      done()

  afterEach ->
    _.delay.restore()
    Backbone.sync.restore()
    @view.attachLocationSearch.restore?()
    @view.attachBookmarksView.restore?()
    @view.modalTemplate.restore?()
    @view.close.restore?()

    mediator.off null, null, this

    benv.teardown()

  describe 'logged out', ->
    it 'has the initial state as initial', ->
      @view.state.get('mode').should.equal 'initial'

    describe '#done', ->
      beforeEach ->
        @view.user.set name: 'Foo Bar', profession: 'Baz'
        @view.state.set mode: 'questionnaire'
        @view.$('button').click()

      it 'attaches sync listeners to the inquiry', ->
        _.keys(@view.inquiry._events).should.eql ['sync', 'error']

      it 'changes the mode to signup and reopens the modal', ->
        @view.inquiry.trigger 'sync'
        @view.$el.attr('data-state').should.equal 'open'
        @view.state.get('mode').should.equal 'signup'

      it 'tries to generate an introduction before sending', ->
        _.last(Backbone.sync.args)[0].should.equal 'create'
        _.last(Backbone.sync.args)[1].url.should.containEql '/api/v1/me/inquiry_introduction'
        _.last(Backbone.sync.args)[1].attributes.should.eql name: 'Foo Bar', profession: 'Baz'
        _.last(Backbone.sync.args)[2].success introduction: 'Foo is Bar'
        @view.inquiry.get('introduction').should.equal 'Foo is Bar'

      it 'sends the inquiry on introduction success', (done) ->
        mediator.once 'inquiry:send', -> done()
        _.last(Backbone.sync.args)[2].success()

      it 'sends the inquiry on introduction error', (done) ->
        mediator.once 'inquiry:send', -> done()
        _.last(Backbone.sync.args)[2].error()

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

        it 'allows the user to skip this whole thing, sending the inquiry and closing the modal', ->
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

      it 'always sets needsOnboarding to false (for now)', ->
        @view.user.needsOnboarding.should.be.false

      it 'saves the user with the new attributes', ->
        _.last(Backbone.sync.args)[0].should.equal 'update'
        _.last(Backbone.sync.args)[1].attributes.name.should.equal 'Bar Baz'

      describe 'user update success', ->
        beforeEach ->
          model = _.last(Backbone.sync.args)[2]

          Backbone.sync.restore()
          @view.close.restore()

          sinon.stub @Questionnaire::, 'close'
          sinon.stub Backbone, 'sync'
          @view.bookmarksView = saveAll: sinon.stub()

          model.success()

        it 'syncs the user', ->
          Backbone.sync.called.should.be.true
          Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'

        it 'saves all the bookmarks', ->
          @view.bookmarksView.saveAll.called.should.be.true

        it 'closes the modal', ->
          @view.close.called.should.be.true

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
        html.should.containEql 'One question to serve you better'
        html.should.containEql 'Have you ever bought art through a gallery or auction before?'

      it 'geolocates the user', ->
        Backbone.sync.args[0][2].url.should.equal 'https://freegeoip.net/json/'

    describe '#advance', ->
      describe 'collector level 3', ->
        it 'should advance to the next state on click and have the correct copy', ->
          @view.$('a').first().click()
          @view.attachLocationSearch.called.should.be.true
          @view.state.get('mode').should.equal 'questionnaire'
          html = @view.$el.html()
          html.should.containEql 'Final Step'
          @view.$el.hasClass 'fade-in'
          @view.attachBookmarksView.called.should.be.true

      describe 'collector level 2', ->
        it 'should advance to the next state on click and have the correct copy', ->
          @view.$('a').last().click()
          @view.attachLocationSearch.called.should.be.true
          @view.state.get('mode').should.equal 'questionnaire'
          html = @view.$el.html()
          html.should.containEql 'Final Step'
          @view.$el.hasClass 'fade-in'
          @view.attachBookmarksView.called.should.be.false

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
        mediator.once 'inquiry:send', -> done()
        @view.$('form').submit()

      it 'persists the user model', ->
        @view.$('input[name="name"]').val 'Foo Bar'
        @view.$('input[name="profession"]').val 'Human Being'
        @view.$('form').submit()
        _.last(Backbone.sync.args)[0].should.equal 'update'
        _.last(Backbone.sync.args)[1].changed.should.eql name: 'Foo Bar', profession: 'Human Being'
        _.last(Backbone.sync.args)[1].url().should.containEql '/api/v1/me'

      it 'refreshes the user on success', ->
        @view.$('form').submit()
        _.last(Backbone.sync.args)[2].success()
        _.last(Backbone.sync.args)[2].url.should.equal '/user/refresh'

      it 'closes the modal on success', ->
        @view.$('form').submit()
        _.last(Backbone.sync.args)[2].success()
        @view.close.called.should.be.true
