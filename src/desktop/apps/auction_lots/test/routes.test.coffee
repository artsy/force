_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
{ fabricate } = require '@artsy/antigravity'

Q = require 'bluebird-q'
totalCount = sinon.stub()
totalCount.returns(Q.resolve(100))
routes.__set__ 'totalCount', totalCount

xdescribe 'Auction results routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#detail', ->
    beforeEach ->
      @req = params: artist_id: 'andy-foobar', id: 'a-lot'
      @res = status: sinon.stub(), render: sinon.stub(), redirect: sinon.spy(), locals: sd: {}
      @next = sinon.stub()

    it 'makes the appropriate requests', (done) ->
      routes.detail @req, @res
      _.defer -> _.defer ->
        Backbone.sync.args.length.should.equal 4
        Backbone.sync.args[0][1].url().should.containEql '/api/v1/auction_lot/a-lot'
        Backbone.sync.args[1][1].url().should.containEql '/api/v1/artist/andy-foobar'
        Backbone.sync.args[2][1].url().should.containEql '/api/v1/artist/andy-foobar/auction_lots?' # some random page
        Backbone.sync.args[2][1].url().should.containEql '&size=3&sort=-price_realized_dollar,-auction_date&total_count=1'
        Backbone.sync.args[3][1].url.should.containEql '/api/v1/artist/andy-foobar/artworks'
        done()

    it '404s if the wrong artist is requested', (done) ->
      routes.detail @req, @res, @next
      _.defer => _.defer =>
        # Successful
        Backbone.sync.args[0][1].set artist_id: 'andy-foobar'
        Backbone.sync.args[1][1].set _id: 'andy-foobar'
        Backbone.sync.args[0][2].success()
        Backbone.sync.args[1][2].success()
        Backbone.sync.args[2][2].success()
        Backbone.sync.args[3][2].success()
        @res.render.calledOnce.should.be.ok()

        # Fail
        Backbone.sync.args[0][1].set artist_id: 'andy-foobar'
        Backbone.sync.args[1][1].set _id: 'mary-foobar'
        Backbone.sync.args[0][2].success()
        @res.render.calledTwice.should.not.be.ok()
        @next.args[0][0].status.should.equal 404
        @next.args[0][0].message.should.equal 'Not Found'

        done()

    it 'redirects to auction results page if the lot request 404s', ->
      routes.detail @req, @res, @next
      Backbone.sync.args[0][1].set artist_id: 'andy-foobar'
      Backbone.sync.args[1][1].set _id: 'mary-foobar'
      Backbone.sync.args[0][2].error(status: 404, 'error')
      @res.render.calledOnce.should.not.be.ok()
      @res.redirect.calledOnce.should.be.ok()
      @res.redirect.args[0][0].should.equal 301
      @res.redirect.args[0][1].should.equal '/artist/andy-foobar/auction-results'

  describe '#artist', ->
    beforeEach ->
      @req = { params: { id: 'andy-foobar' }, query: { page: '1', sort: '-price_realized_dollar,-auction_date' } }
      @res = {}

    it 'makes the appropriate requests', ->
      routes.artist @req, @res
      Backbone.sync.args.length.should.equal 2
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/artist/andy-foobar'
      Backbone.sync.args[1][1].url().should.containEql '/api/v1/artist/andy-foobar/auction_lots?page=1&size=25&sort=-price_realized_dollar,-auction_date&total_count=1'

  describe '#artwork', ->
    beforeEach ->
      @req = params: id: 'andy-foobar-artwork'
      @res = { redirect: @redirectStub = sinon.stub() }

    it 'redirect artwork results to artwork page', ->
      routes.artwork @req, @res
      @redirectStub.called.should.be.ok()

  describe 'no results', ->
    beforeEach ->
      @req = params: { id: 'foo-bar' }, query: {}
      @res = locals: { sd: {} }, render: @renderStub = sinon.stub(), redirect: @redirectStub = sinon.stub()

    describe '#artist', ->
      it 'redirects', ->
        routes.artist @req, @res
        Backbone.sync.args[0][2].success {}
        Backbone.sync.args[1][2].success null
        @renderStub.called.should.not.be.ok()
        @redirectStub.called.should.be.ok()

  describe 'has results', ->
    beforeEach ->
      @req = params: { id: 'foo-bar' }, query: {}
      @res = locals: { sd: {} }, render: @renderStub = sinon.stub(), redirect: @redirectStub = sinon.stub()

    describe '#artist', ->
      it 'renders', ->
        routes.artist @req, @res
        Backbone.sync.args[0][2].success {}
        Backbone.sync.args[1][2].success {}
        @renderStub.called.should.be.ok()
        @redirectStub.called.should.not.be.ok()
