_               = require 'underscore'
benv            = require 'benv'
sinon           = require 'sinon'
Backbone        = require 'backbone'
mediator        = require '../../../lib/mediator'
AfterInquiry    = require '../index'
LoggedOutUser   = require '../../../models/logged_out_user'

describe 'AfterInquiry', ->
  before (done) ->
    benv.setup =>
      benv.expose $: require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub _, 'delay'
    sinon.stub Backbone, 'sync'

    @user     = new LoggedOutUser
    @inquiry  = new Backbone.Model name: 'Foo Bar', email: 'foo@bar.com'
    @flow     = new AfterInquiry user: @user, inquiry: @inquiry

  afterEach ->
    _.delay.restore()
    Backbone.sync.restore()
    @flow.remove()

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
          new AfterInquiry user: @user, inquiry: @inquiry
          Backbone.sync.called.should.be.true
          Backbone.sync.args[0][1].url().should.include '/api/v1/me'

    it 'initializes a new flash message', ->
      @flow.flash.$el.text().should.equal 'Thank you. Your inquiry is sending…'

    it 'responds to the inquiry success event by updating the flash message accordingly', ->
      mediator.trigger 'inquiry:success'
      @flow.flash.$el.text().should.equal 'Your inquiry has been sent.'

    it 'responds to the inquiry error event by updating the flash message accordingly', ->
      mediator.trigger 'inquiry:error'
      @flow.flash.$el.text().should.equal 'There was a problem with sending your inquiry'

    describe 'if the questionnaire modal is closed', ->
      it 'will close the flash message', ->
        closeStub = sinon.stub()
        @flow.flash.close = -> closeStub()
        closeStub.called.should.be.false
        mediator.trigger 'modal:closed'
        closeStub.called.should.be.true

      it 'trigger the inquiry:send event', (done) ->
        mediator.on 'inquiry:send', done, this
        mediator.trigger 'modal:closed'
        mediator.off 'inquiry:send', null, this

      it 'only triggers the inquiry:send if an inquiry has not already been sent', ->
        callStub = sinon.stub()
        mediator.on 'inquiry:send', callStub
        @inquiry.trigger 'request'
        mediator.trigger 'modal:closed'
        callStub.called.should.be.false
