_         = require 'underscore'
benv      = require 'benv'
sinon     = require 'sinon'
Backbone  = require 'backbone'
rewire    = require 'rewire'

describe 'ContactView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @ContactView = rewire '../view'
      sinon.stub @ContactView.prototype, 'open'
      sinon.stub @ContactView.prototype, 'updatePosition'
      done()

  after ->
    benv.teardown()

  describe 'User not logged in', ->
    beforeEach ->
      @view = new @ContactView

    it 'should pass a null user', ->
      _.isNull(@view.templateData.user).should.be.ok

  describe 'User logged in', ->
    beforeEach ->
      @ContactView.__set__ 'CurrentUser', { orNull: -> true }
      @view = new @ContactView

    it 'should pass a user', ->
      @view.templateData.user.should.be.ok
