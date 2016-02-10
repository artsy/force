_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
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
      filter = new @Filter()
      query = filter.query()
      query.should.containEql 'ArtworkAggregation'

  describe '#params', ->
    it 'returns default params', ->
      filter = new @Filter()
      filter.params().should.containEql 'for_sale'
      filter.params().should.containEql 'aggregations'
