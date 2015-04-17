_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
routes = rewire '../routes'

describe '/auction routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = params: id: 'foobar'
    @res = render: sinon.stub(), locals: sd: {}

  afterEach ->
    Backbone.sync.restore()

  it 'fetches the auction data and renders the index template', (done) ->
    routes.__get__('Articles')::fetch = -> super; finally: (cb) -> cb()

    routes.index @req, @res
    _.defer =>
      Backbone.sync.callCount.should.equal 2

      Backbone.sync.args[0][1].url().should.containEql '/api/v1/sale/foobar'
      Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/foobar/sale_artworks'
      Backbone.sync.args[1][2].data.should.equal 'total_count=1&size=10'

      successes = _.map Backbone.sync.args[0..-1], (args) -> args[2].success
      successes[0]({})
      successes[1]({})

      _.defer =>
        _.last(Backbone.sync.args)[1].url.should.containEql '/api/articles'

        _.defer =>
          @res.render.args[0][0].should.equal 'index'
          _.keys(@res.render.args[0][1]).should.eql [
            'auction'
            'artworks'
            'saleArtworks'
            'articles'
            'user'
            'state'
            'displayBlurbs'
          ]
          done()

  describe 'with logged in user', ->
    beforeEach (done) ->
      @req = user: new CurrentUser(id: 'foobar'), params: id: 'foobar'
      routes.index @req, @res
      _.defer =>
        @userReqs = _.last Backbone.sync.args, 2
        done()

    it 'fetches the full user & bidder positions', ->
      @userReqs[0][1].url().should.containEql '/api/v1/me'
      @userReqs[1][2].url.should.containEql '/api/v1/me/bidders'
      @userReqs[1][2].data.sale_id.should.equal 'foobar'

    it 'sets the `registered_to_bid` attr', ->
      @userReqs[1][2].success [{}]
      @req.user.get('registered_to_bid').should.be.true
