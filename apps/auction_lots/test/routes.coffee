_               = require 'underscore'
sinon           = require 'sinon'
Backbone        = require 'backbone'
rewire          = require 'rewire'
routes          = rewire '../routes'
{ fabricate }   = require 'antigravity'

Q = require 'q'
totalCount = sinon.stub()
totalCount.returns(Q.resolve(100))
routes.__set__ 'totalCount', totalCount

describe 'Auction results routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#detail', ->
    beforeEach ->
      @req = params: artist_id: 'andy-foobar', id: 'a-lot'
      @res = locals: artsyXappToken: 'token'

    it 'makes the appropriate requests', (done) ->
      routes.detail @req, @res
      _.defer =>
        Backbone.sync.args.length.should.equal 4
        Backbone.sync.args[0][1].url().should.include '/api/v1/auction_lot/a-lot'
        Backbone.sync.args[1][1].url().should.include '/api/v1/artist/andy-foobar'
        Backbone.sync.args[2][1].url().should.include '/api/v1/artist/andy-foobar/auction_lots?' # some random page
        Backbone.sync.args[2][1].url().should.include '&size=3&sort=date,-auction_date&total_count=1'
        Backbone.sync.args[3][1].url.should.include '/api/v1/artist/andy-foobar/artworks'
        done()

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
      @req = params: id: 'andy-foobar-artwork'
      @res = {}

    it 'makes the appropriate requests', ->
      routes.artwork @req, @res
      Backbone.sync.args.length.should.equal 2
      Backbone.sync.args[0][1].url().should.include '/api/v1/artwork/andy-foobar-artwork'
      Backbone.sync.args[1][1].url().should.include '/api/v1/artwork/andy-foobar-artwork/comparable_sales'


  describe 'no results', ->
    beforeEach ->
      @req = params: { id: 'foo-bar' }, query: {}
      @res = locals: { sd: {} }, render: @renderStub = sinon.stub(), redirect: @redirectStub = sinon.stub()

    describe '#artist', ->
      it 'redirects', ->
        routes.artist @req, @res
        Backbone.sync.args[0][2].success {}
        Backbone.sync.args[1][2].success null
        @renderStub.called.should.not.be.ok
        @redirectStub.called.should.be.ok

    describe '#artwork', ->
      it 'redirects', ->
        routes.artwork @req, @res
        Backbone.sync.args[0][2].success {}
        Backbone.sync.args[1][2].success null
        @renderStub.called.should.not.be.ok
        @redirectStub.called.should.be.ok

  describe 'has results', ->
    beforeEach ->
      @req = params: { id: 'foo-bar' }, query: {}
      @res = locals: { sd: {} }, render: @renderStub = sinon.stub(), redirect: @redirectStub = sinon.stub()

    describe '#artist', ->
      it 'renders', ->
        routes.artist @req, @res
        Backbone.sync.args[0][2].success {}
        Backbone.sync.args[1][2].success {}
        @renderStub.called.should.be.ok
        @redirectStub.called.should.not.be.ok

    describe '#artwork', ->
      it 'renders', ->
        routes.artwork @req, @res
        Backbone.sync.args[0][2].success {}
        Backbone.sync.args[1][2].success {}
        @renderStub.called.should.be.ok
        @redirectStub.called.should.not.be.ok
