_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
{ fabricate } = require 'antigravity'
routes = require '../routes'

describe '/auction routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

    @req = params: id: 'foobar'
    @res = render: sinon.stub(), locals: sd: {}

  afterEach ->
    Backbone.sync.restore()

  it 'first fetches the feature', ->
    routes.index @req, @res
    Backbone.sync.args[0][2].url.should.containEql '/api/v1/sets/contains?item_type=Sale&item_id=foobar'

  it 'then fetches the remaining aspects of the auction', (done) ->
    routes.index @req, @res
    Backbone.sync.args[0][2].success [{ owner: {} }]
    _.defer =>
      Backbone.sync.callCount.should.equal 6

      Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/foobar'

      Backbone.sync.args[2][1].url().should.containEql '/api/v1/feature'

      # Start of fetchPartner
      Backbone.sync.args[3][1].url().should.containEql '/api/v1/sale/foobar/sale_artworks'
      Backbone.sync.args[3][2].data.should.eql size: 1

      Backbone.sync.args[4][1].url().should.containEql '/api/v1/sale/foobar/sale_artworks'
      Backbone.sync.args[4][2].data.should.equal 'total_count=1&size=10'

      done()

  xit 'renders the index template', (done) ->
    routes.index @req, @res
    Backbone.sync.args[0][2].success [{ owner: {} }]
    _.defer =>
      successes = _.map Backbone.sync.args[1..-1], (args) -> args[2].success
      successes[0]({})
      successes[1]({})
      successes[2]([])
      successes[3]([])
      successes[4]([])
      _.defer =>
        @res.render.args[0][0].should.equal 'index'
        _.keys(@res.render.args[0][1]).should.eql [
          'auction'
          'feature'
          'profile'
          'artworks'
          'saleArtworks'
          'user'
          'sets'
        ]
        done()

  describe 'with logged in user', ->
    beforeEach (done) ->
      @req = user: new CurrentUser(id: 'foobar'), params: id: 'foobar'
      routes.index @req, @res
      Backbone.sync.args[0][2].success [{ owner: {} }]
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
