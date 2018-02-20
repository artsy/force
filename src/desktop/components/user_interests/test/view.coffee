_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
UserInterestsView = null

describe 'UserInterestsView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      UserInterestsView = rewire  '../view'
      UserInterestsView.__set__ 'CURRENT_USER', 'existy'
      UserInterestsView.__set__ 'ResultsListView', Backbone.View
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new UserInterestsView

  afterEach ->
    Backbone.sync.restore()

  describe '#interested', ->
    beforeEach ->
      interest = new Backbone.Model id: 'foobar', name: 'Foo Bar'
      @view.resultsList.trigger 'add', interest

    it 'when a result is added; the view syncs it as an inteerest', ->
      Backbone.sync.callCount.should.equal 2

      Backbone.sync.args[0][1].url()
        .should.containEql '/api/v1/me/user_interest'
      Backbone.sync.args[0][1].attributes
        .should.eql
          interest_type: 'Artist'
          interest_id: 'foobar'
          interest: id: 'foobar', name: 'Foo Bar'
          category: 'collected_before'

      Backbone.sync.args[1][1].url()
        .should.containEql '/api/v1/me/follow/artist'

      @view.following.length.should.equal 1

  describe '#uninterested', ->
    beforeEach ->
      @interest = new Backbone.Model id: 'foobar', name: 'Foo Bar'
      @view.collection.addInterest @interest

    it 'removes the interest from the collection', ->
      @view.collection.length.should.equal 1
      @view.resultsList.trigger 'remove', @interest
      @view.collection.length.should.equal 0

    it 'destroys the interest', ->
      sinon.spy @view.collection.model::, 'destroy'
      @view.resultsList.trigger 'remove', @interest
      @view.collection.model::destroy.called.should.be.true()
