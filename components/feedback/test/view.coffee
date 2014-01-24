_         = require 'underscore'
benv      = require 'benv'
sinon     = require 'sinon'
Backbone  = require 'backbone'
rewire    = require 'rewire'

describe 'FeedbackView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      @FeedbackView = rewire '../view'
      sinon.stub @FeedbackView.prototype, 'open'
      sinon.stub @FeedbackView.prototype, 'updatePosition'
      done()

  after ->
    benv.teardown()

  describe 'User not logged in', ->
    beforeEach ->
      @view = new @FeedbackView

    it 'should pass a null user', ->
      _.isNull(@view.templateData.user).should.be.ok

  describe 'User logged in', ->
    beforeEach ->
      @FeedbackView.__set__ 'CurrentUser', { orNull: -> true }
      @view = new @FeedbackView

    it 'should pass a user', ->
      @view.templateData.user.should.be.ok
