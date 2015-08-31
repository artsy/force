_ = require 'underscore'
Q = require 'bluebird-q'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
routes = rewire '../routes'

describe '/auction routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub Q, 'promise'
    @req = params: id: 'foobar'
    @res = render: sinon.stub(), locals: sd: {}
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    Q.promise.restore()

  it 'fetches the auction data and renders the index template', (done) ->
    routes.index @req, @res, @next

    Backbone.sync.callCount.should.equal 2

    Backbone.sync.args[0][1].url().should.containEql '/api/v1/sale/foobar'
    Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/foobar/sale_artworks'
    Backbone.sync.args[1][2].data.should.equal 'total_count=1&size=10'

    Backbone.sync.args[0][2].success fabricate 'sale', is_auction: true
    Backbone.sync.args[1][2].success {}

    _.defer => _.defer =>
      Q.promise.args[0][0]()
      _.last(Backbone.sync.args)[1].url.should.containEql '/api/articles'

      @next.called.should.be.false()
      @res.render.args[0][0].should.equal 'index'
      _.keys(@res.render.args[0][1]).should.eql [
        'auction'
        'artworks'
        'saleArtworks'
        'articles'
        'user'
        'state'
        'displayBlurbs'
        'maxBlurbHeight'
        'footerItems'
      ]
      done()

  it 'fetches the auction data and nexts to the sale if it is a sale', (done) ->
    routes.index @req, @res, @next
    Backbone.sync.args[0][2].success fabricate 'sale', is_auction: false
    Backbone.sync.args[1][2].success {}
    _.defer => _.defer =>
      @next.called.should.be.true()
      @res.render.called.should.be.false()
      done()

  it 'passes down the error', (done) ->
    routes.index @req, @res, @next
    @next.called.should.be.false()
    Backbone.sync.args[0][2].error()
    Backbone.sync.args[1][2].error()
    _.defer => _.defer =>
      @next.called.should.be.true()
      done()

  describe 'with logged in user', ->
    beforeEach (done) ->
      @req = user: new CurrentUser(id: 'foobar'), params: id: 'foobar'
      routes.index @req, @res, @next
      _.defer => _.defer =>
        @userReqs = _.last Backbone.sync.args, 2
        done()

    it 'fetches the bidder positions', ->
      @userReqs[1][2].url.should.containEql '/api/v1/me/bidders'
      @userReqs[1][2].data.sale_id.should.equal 'foobar'

    it 'sets the `registered_to_bid` attr', ->
      @userReqs[1][2].success ['existy']
      @req.user.get('registered_to_bid').should.be.true()
