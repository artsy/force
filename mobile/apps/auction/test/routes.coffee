_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
rewire = require 'rewire'
routes = rewire '../routes'
moment = require 'moment'

describe '/auction routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = body: {}, params: { id: 'foobar-auction' }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals: sd: {}
    @next = sinon.stub()
    @__request__ = routes.__get__ 'request'
    @request = {}
    @request.post = sinon.stub().returns @request
    @request.send = sinon.stub().returns @request
    @request.end = sinon.stub().returns @request
    routes.__set__ 'request', @request

  afterEach ->
    Backbone.sync.restore()
    routes.__set__ 'request', @__request__

  describe 'without user', ->
    describe '#index', ->
      it 'fetches everything and renders', (done) ->
        routes.index(@req, @res).then =>
          @res.locals.sd.AUCTION.id.should.equal 'foobar-auction'
          @res.render.args[0][0].should.equal 'index'
          @res.render.args[0][1].auction.id.should.equal 'foobar-auction'
          done()


        Backbone.sync.callCount.should.equal 2
        Backbone.sync.args[0][1].url().should.containEql '/api/v1/sale/foobar-auction'
        Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/foobar-auction/sale_artworks'
        Backbone.sync.args[1][2].data.should.equal 'total_count=1&size=10'

        Backbone.sync.args[0][2].success fabricate 'sale', id: 'foobar-auction'
        Backbone.sync.args[1][2].success {}

      it 'redirects when live starts', (done) ->
        routes.index @req, @res
        Backbone.sync.args[0][2].success fabricate 'sale',
          id: 'foobar-auction'
          start_at: moment().subtract(2, 'days')
          live_start_at: moment().startOf('day')
          end_at: moment().endOf('day')
          auction_state: 'open'
        Backbone.sync.args[1][2].success {}
        _.defer => _.defer =>
          @res.redirect.args[0][0].should
            .equal 'https://live.artsy.net/foobar-auction'
          done()

    describe '#subscribe', ->
      it 'subscribes to mailchimp', ->
        @req.params.id = 'foo-auction'
        @req.body.email = 'foo@bar.com'
        @request.end.yields null, ok: true, {}
        routes.subscribe @req, @res, @next
        @request.send.args[0][0].email.email.should.equal 'foo@bar.com'
        @request.send.args[0][0].merge_vars['AUCTION_foo-auction'].should.equal true

  describe 'with user', ->
    describe '#index', ->
      beforeEach ->
        @req = _.extend {}, @req, user: new CurrentUser

      it 'fetches everything, sets up the user, and renders', (done) ->
        routes.index @req, @res

        Backbone.sync.callCount.should.equal 3
        Backbone.sync.args[0][1].url().should.containEql '/api/v1/sale/foobar-auction'
        Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/foobar-auction/sale_artworks'
        Backbone.sync.args[1][2].data.should.equal 'total_count=1&size=10'

        Backbone.sync.args[2][2].url.should.containEql '/api/v1/me/bidders'

        Backbone.sync.args[0][2].success fabricate 'sale', id: 'foobar-auction'
        Backbone.sync.args[1][2].success {}
        Backbone.sync.args[2][2].success [{ id: 'i-am-a-bidder' }]

        _.defer => _.defer =>
          @res.render.called.should.be.true()
          @res.render.args[0][1].user.get('registered_to_bid').should.be.true()
          done()
