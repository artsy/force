_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'

describe 'ContactView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
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
      _.isNull(@view.user).should.be.ok()

  describe 'User logged in', ->
    beforeEach ->
      @ContactView.__set__ 'CurrentUser', { orNull: -> true }
      @view = new @ContactView

    it 'should pass a user', ->
      @view.user.should.be.ok()

    describe '#initialize', ->
      it 'has sensible defaults which get set as the view options', ->
        @view.options.width.should.equal '470px'
        @view.options.placeholder.should.equal 'Your message'
        @view.options.url.should.containEql 'api/v1/feedback'

      it 'instantiates a model to use with the passed in API URL', ->
        @view.model.url.should.equal @view.options.url
