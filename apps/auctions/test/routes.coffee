_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Sale = require '../../../models/sale'
routes = require '../routes'

describe 'Auctions routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      @sales = [
        @invalidSale = new Sale fabricate 'sale', eligible_sale_artworks_count: 0, auction_state: 'open', id: 'invalid-sale'
        @openSale = new Sale fabricate 'sale', auction_state: 'open', id: 'open-sale', eligible_sale_artworks_count: 1
        @closedSale = new Sale fabricate 'sale', auction_state: 'closed', id: 'closed-sale', eligible_sale_artworks_count: 1
        @previewSale = new Sale fabricate 'sale', auction_state: 'preview', id: 'preview-sale', eligible_sale_artworks_count: 1
      ]
      @res = render: sinon.stub(), locals: sd: {}

    it 'fetches the relevant auction data and renders the index template', (done) ->
      routes.index {}, @res
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sales'
      Backbone.sync.args[0][2].data.should.eql is_auction: true, published: true, size: 20, sort: '-created_at'
      Backbone.sync.args[0][2].success(@sales)
      Backbone.sync.callCount.should.equal 5
      Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/invalid-sale/sale_artworks'
      Backbone.sync.args[1][2].data.should.eql size: 5, sort: 'position'
      _.defer =>
        @res.locals.sd.CURRENT_AUCTIONS.should.eql [@openSale]
        @res.locals.sd.ARTWORK_DIMENSIONS.should.eql [
          { id: 'open-sale', dimensions: [] }
          { id: 'closed-sale', dimensions: [] }
        ]
        @res.render.args[0][0].should.equal 'index'
        @res.render.args[0][1].pastAuctions.should.eql [@closedSale]
        @res.render.args[0][1].currentAuctions.should.eql [@openSale]
        @res.render.args[0][1].upcomingAuctions.should.eql [@previewSale]
        done()
