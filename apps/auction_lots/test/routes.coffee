sinon     = require 'sinon'
Backbone  = require 'backbone'
routes    = require '../routes'

describe 'Auction results routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#artist', ->
    beforeEach ->
      @req = { params: { id: 'andy-foobar' }, query: { page: '1', sort: '-price_realized_dollar,-auction_date' } }
      @res = {}

    it 'makes the appropriate requests', ->
      routes.artist @req, @res
      Backbone.sync.args.length.should.equal 2
      Backbone.sync.args[0][1].url().should.include '/api/v1/artist/andy-foobar'
      Backbone.sync.args[1][1].url().should.include '/api/v1/artist/andy-foobar/auction_lots?page=1&size=25&sort=-price_realized_dollar,-auction_date&total_count=1'

  describe '#artwork', ->
    beforeEach ->
      @req = { params: { id: 'andy-foobar-artwork' } }
      @res = {}

    it 'makes the appropriate requests', ->
      routes.artwork @req, @res
      Backbone.sync.args.length.should.equal 2
      Backbone.sync.args[0][1].url().should.include '/api/v1/artwork/andy-foobar-artwork'
      Backbone.sync.args[1][1].url().should.include '/api/v1/artwork/andy-foobar-artwork/comparable_sales'
