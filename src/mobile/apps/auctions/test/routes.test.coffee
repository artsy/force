_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Sale = require '../../../models/sale'
routes = require '../routes'
moment = require 'moment'

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
      @res = render: sinon.stub(), locals: sd: {}, asset: (->)

    it 'fetches the relevant auction data and renders the index template', (done) ->
      routes.index {}, @res
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sales'
      Backbone.sync.args[0][2].data.should.eql is_auction: true, published: true, size: 100, sort: '-timely_at,name'
      Backbone.sync.args[0][2].success(@sales)
      Backbone.sync.callCount.should.equal 5
      Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/invalid-sale/sale_artworks'
      Backbone.sync.args[1][2].data.should.eql size: 5
      _.defer => _.defer =>
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

  describe '#index with sort', ->
    beforeEach ->
      @sales = [
        @invalidSale = new Sale fabricate 'sale', eligible_sale_artworks_count: 0, auction_state: 'open', id: 'invalid-sale'
        @openSale = new Sale fabricate 'sale', auction_state: 'open', id: 'open-sale', eligible_sale_artworks_count: 1, end_at: moment().add(5, 'days')
        @openLiveSale = new Sale fabricate 'sale', auction_state: 'open', id: 'open-live-sale', eligible_sale_artworks_count: 1, end_at: moment().add(12, 'days'), live_start_at: moment().add(7, 'days')
        @anotherOpenSale = new Sale fabricate 'sale', auction_state: 'open', id: 'another-open-sale', eligible_sale_artworks_count: 1, end_at: moment().add(10, 'days')
      ]
      @res = render: sinon.stub(), locals: sd: {}, asset: (->)

    it 'sorts the open auctions by live_start_at or end_at', (done) ->
      routes.index {}, @res
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/sales'
      Backbone.sync.args[0][2].data.should.eql is_auction: true, published: true, size: 100, sort: '-timely_at,name'
      Backbone.sync.args[0][2].success(@sales)
      Backbone.sync.callCount.should.equal 5
      Backbone.sync.args[1][1].url().should.containEql '/api/v1/sale/invalid-sale/sale_artworks'
      Backbone.sync.args[1][2].data.should.eql size: 5
      _.defer => _.defer =>
        @res.locals.sd.CURRENT_AUCTIONS.should.eql [@openSale, @openLiveSale, @anotherOpenSale]
        @res.locals.sd.ARTWORK_DIMENSIONS.should.eql [
          { id: 'open-sale', dimensions: [] }
          { id: 'open-live-sale', dimensions: [] }
          { id: 'another-open-sale', dimensions: [] }
        ]
        @res.render.args[0][0].should.equal 'index'
        @res.render.args[0][1].pastAuctions.should.eql []
        @res.render.args[0][1].currentAuctions.should.eql [@openSale, @openLiveSale, @anotherOpenSale]
        @res.render.args[0][1].upcomingAuctions.should.eql []
        done()
