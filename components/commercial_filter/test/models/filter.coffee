_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate, fabricate2 } = require 'antigravity'

describe 'Filter', ->

  before (done) ->
    benv.setup =>
      @Filter = require '../../models/filter'
      benv.expose
        sd: METAPHYSICS_ENDPOINT: 'http://metaphysics.test'
      done()

  after ->
    benv.teardown()

  describe '#query', ->
    it 'returns a query string', ->
      filter = new @Filter params: new Backbone.Model()
      query = filter.query()
      query.should.containEql 'ArtworkAggregation'

