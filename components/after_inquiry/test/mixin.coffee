_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
mediator = require '../../../lib/mediator'
LoggedOutUser = require '../../../models/logged_out_user'
CurrentUser = require '../../../models/current_user'

describe 'AfterInquiryMixin', ->
  before (done) ->
    benv.setup =>
      benv.expose $: require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    AfterInquiryMixin = @AfterInquiryMixin = rewire '../mixin.coffee'
    AfterInquiryMixin.__set__ 'hasSeen', sinon.stub().returns false
    AfterInquiryMixin.__set__ 'AfterInquiry', @afterInquiryStub = sinon.stub()
    @View = class View extends Backbone.View
      _.extend @prototype, AfterInquiryMixin
      eligibleForAfterInquiryFlow: true

    @view = new View
    @view.user = new CurrentUser id: 'existy'
    @inquiry = new Backbone.Model
    @inquiry.url = '/api/v1/me/artwork_inquiry_request'
    @view.inquiry = @inquiry

  afterEach ->
    Backbone.sync.restore()

  describe '#maybeSend', ->
    it 'should send the inquiry unencumbered if the view is not eligibleForAfterInquiryFlow', ->
      @view.eligibleForAfterInquiryFlow = false
      @view.maybeSend @inquiry
      Backbone.sync.callCount.should.equal 1
      Backbone.sync.called.should.be.true
      Backbone.sync.args[0][1].url.should.equal '/api/v1/me/artwork_inquiry_request'

    it 'should send the inquiry unencumbered if the user has already seen the after-inquiry flow', ->
      @view.eligibleForAfterInquiryFlow = true
      @AfterInquiryMixin.__set__ 'hasSeen', sinon.stub().returns true
      @view.maybeSend @inquiry
      Backbone.sync.callCount.should.equal 1
      Backbone.sync.called.should.be.true
      Backbone.sync.args[0][1].url.should.equal '/api/v1/me/artwork_inquiry_request'

    describe 'should pass on success and error callbacks to the inquiry', ->
      beforeEach ->
        Backbone.sync.restore()
        @view.eligibleForAfterInquiryFlow = false

      it 'works for success', (done) ->
        sinon.stub(Backbone, 'sync').yieldsTo 'success'
        @view.maybeSend @inquiry, success: -> done()

      it 'works for error', (done) ->
        sinon.stub(Backbone, 'sync').yieldsTo 'error'
        @view.maybeSend @inquiry, error: -> done()

      describe 'isModal', ->
        beforeEach ->
          # Will cause isModal to evaluate to true
          @view.close = ->

        it 'works for success', (done) ->
          sinon.stub(Backbone, 'sync').yieldsTo 'success'
          @view.maybeSend @inquiry, success: -> done()

        it 'works for error', (done) ->
          sinon.stub(Backbone, 'sync').yieldsTo 'error'
          @view.maybeSend @inquiry, error: -> done()


    it 'should initialize a LoggedOutUser if the user is logged out', ->
      @view.user = undefined
      @view.eligibleForAfterInquiryFlow = false
      @view.maybeSend @inquiry
      @view.user.should.be.an.instanceOf LoggedOutUser

    it 'should close the modal (with the initialize callback) view before initializing the AfterInquiry flow', ->
      @View::close = closeStub = sinon.stub()
      @view.maybeSend @inquiry
      closeStub.called.should.be.ok
      closeStub.args[0][0].should.be.an.instanceOf Function

    describe '#initializeAfterInquiry', ->
      it 'should pass the inquiry and user to the AfterInquiry view', ->
        @view.maybeSend @inquiry
        @afterInquiryStub.args[0][0].inquiry.should.equal @inquiry
        @afterInquiryStub.args[0][0].user.should.equal @view.user

      it 'attaches an event handler to the mediator that sends the inquiry', ->
        @view.maybeSend @inquiry
        Backbone.sync.called.should.be.false
        mediator.trigger 'inquiry:send'
        Backbone.sync.called.should.be.true

  describe '#send', ->
    it 'should send the inquiry', ->
      @view.send()
      Backbone.sync.called.should.be.true
      Backbone.sync.args[0][0].should.equal 'create'
      Backbone.sync.args[0][1].url.should.equal '/api/v1/me/artwork_inquiry_request'

    describe 'with callbacks', ->
      beforeEach ->
        Backbone.sync.restore()

      it 'should include the success callback', (done) ->
        sinon.stub(Backbone, 'sync').yieldsTo 'success'
        @view.inquiryOptions = success: -> done()
        @view.send()

      it 'should include the error callback', (done) ->
        sinon.stub(Backbone, 'sync').yieldsTo 'error'
        @view.inquiryOptions = error: -> done()
        @view.send()

      describe 'isModal', ->
        it 'discards the success callback', ->
          sinon.stub(Backbone, 'sync').yieldsTo 'success'
          @view.inquiryOptions = success: sinon.stub()
          @view.isModal = true
          @view.send()
          @view.inquiryOptions.success.called.should.be.false
