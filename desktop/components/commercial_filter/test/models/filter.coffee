_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'Filter', ->

  before (done) ->
    benv.setup =>
      @Filter = require '../../models/filter'
      @Params = require '../../models/params'
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

    it 'does not include the artist fragment by default', ->
      filter = new @Filter params: new Backbone.Model()
      query = filter.query()
      query.should.not.containEql 'fragment artist on Artist'

    it 'includes the artist fragment and merchandisable artists fragment if that aggregation is specified', ->
      params = new @Params(aggregations: ['MERCHANDISABLE_ARTISTS'], {})
      filter = new @Filter params: params
      query = filter.query()
      query.should.containEql 'fragment artist on Artist'
      query.should.containEql 'merchandisable_artists'
