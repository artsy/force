_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator'
LoggedOutUser = require '../../../models/logged_out_user'

describe 'AfterInquiry', ->
  before (done) ->
    benv.setup =>
      benv.expose $: require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end

      @Cookies = require 'cookies-js'
      @AfterInquiry = rewire '../index'
      @AfterInquiry.__set__ 'Questionnaire', Backbone.View

      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub _, 'delay', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    sinon.stub($, 'ajax').yieldsTo 'success'

    @user = new LoggedOutUser
    @inquiry = new Backbone.Model name: 'Foo Bar', email: 'foo@bar.com'
    @flow = new @AfterInquiry user: @user, inquiry: @inquiry

    sinon.stub @flow.flash, 'close'

  afterEach ->
    _.delay.restore()
    Backbone.sync.restore()
    $.ajax.restore()
    @flow.flash.close.restore()
    @flow.remove()
    mediator.off null, null, this

  describe '#constructor', ->
    describe 'logged out', ->
      describe '#setupUser', ->
        it 'sets the email and name on the user object, sourced from the inquiry', ->
          @user.get('name').should.equal @inquiry.get('name')
          @user.get('email').should.equal @inquiry.get('email')

    describe 'logged in', ->
      describe '#setupUser', ->
        it 'assumes we already have name/email and performs a fetch for extra attributes (job/profession)', ->
          @user.set id: 'foobar'
          flow = new @AfterInquiry user: @user, inquiry: @inquiry
          Backbone.sync.called.should.be.true
          Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'
          flow.remove()

    it 'initializes a new flash message', ->
      @flow.flash.message.should.equal 'Thank you. Your inquiry is sending&hellip;'

    it 'responds to the inquiry success event by updating the flash message accordingly', ->
      @inquiry.trigger 'sync'
      @flow.flash.message.should.equal 'Thank you. Your inquiry has been sent.'

    it 'responds to the inquiry error event by updating the flash message accordingly', ->
      @inquiry.trigger 'error'
      @flow.flash.message.should.equal 'There was a problem with sending your inquiry'

    it 'attaches a beforeunload handler to window', ->
      $._data($(window)[0], 'events').should.have.keys 'beforeunload'

    describe 'if the questionnaire modal is closed', ->
      describe 'inquiry send was not yet requested', ->
        beforeEach ->
          @flow.inquiryRequest = undefined

        it 'will trigger an inquiry send', (done) ->
          mediator.on 'inquiry:send', done, this
          mediator.trigger 'modal:closed'

      describe 'inquiry send was requested', ->
        beforeEach ->
          @inquiry.trigger 'request'

        describe 'logged out', ->
          beforeEach ->
            @user.needsOnboarding = true

          describe 'and it was not yet sent', ->
            it 'attaches a handler for the inquiry:success event that, when executed, POSTs a flash message, and sends the user to onboarding', ->
              mediator.trigger 'modal:closed'
              @inquiry.trigger 'sync'
              $.ajax.args[0][0].url.should.equal '/flash'
              $.ajax.args[0][0].type.should.equal 'post'
              $.ajax.args[0][0].data.message.
                should.equal 'Thanks for creating your account Foo Bar.<br>Take 60 seconds to personalize your experience'
              window.location.should.equal '/personalize'

          describe 'and it was sent successfully', ->
            beforeEach ->
              @inquiry.trigger 'sync'
              mediator.trigger 'modal:closed'

            it 'unbinds the beforeunload handler', ->
              _.isUndefined($._data($(window)[0], 'events')).should.be.ok

            it 'sets a destination cookie', ->
              (@Cookies.get('destination')?).should.be.true

            it 'POST a flash message and send the user to onboarding', ->
              $.ajax.args[0][0].url.should.equal '/flash'
              $.ajax.args[0][0].type.should.equal 'post'
              $.ajax.args[0][0].data.message.
                should.equal 'Thanks for creating your account Foo Bar.<br>Take 60 seconds to personalize your experience'
              window.location.should.equal '/personalize'

        describe 'logged in', ->
          describe 'and it was not yet sent', ->
            it 'attaches a handler for the inquiry:success event and removes on its execution', ->
              mediator.trigger 'modal:closed'
              @flow.flash.close.called.should.be.false
              @inquiry.trigger 'sync'
              @flow.flash.close.called.should.be.true

          describe 'and it was sent successfully', ->
            beforeEach ->
              @inquiry.trigger 'sync'

            it 'should tear everything down when the modal is closed', ->
              @flow.flash.close.called.should.be.false
              previousNumberOfEvents = _.flatten(_.values(mediator._events)).length
              mediator.trigger 'modal:closed'
              @flow.flash.close.called.should.be.true
              currentNumberOfEvents = _.flatten(_.values(mediator._events)).length
              (previousNumberOfEvents > currentNumberOfEvents).should.be.true
