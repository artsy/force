_ = require 'underscore'
Q = require 'q'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'
CurrentUser = require '../../../models/current_user'
routes = require '../routes'

describe 'Auctions routes', ->
  beforeEach ->
    sinon.stub(Backbone, 'sync').returns Q.resolve()

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    before ->
      @sales = [
        @sneakySale = new Auction fabricate 'sale', is_auction: false, auction_state: 'open', id: 'sneaky-sale', eligible_sale_artworks_count: 1

        @openAuction = new Auction fabricate 'sale', is_auction: true, auction_state: 'open', id: 'open-sale', eligible_sale_artworks_count: 1
        @closedAuction = new Auction fabricate 'sale', is_auction: true, auction_state: 'closed', id: 'closed-sale', eligible_sale_artworks_count: 1
        @previewAuction = new Auction fabricate 'sale', is_auction: true, auction_state: 'preview', id: 'preview-sale', eligible_sale_artworks_count: 1

        @previewPromoAuction = new Auction fabricate 'sale', is_auction: false, auction_state: 'preview', id: 'preview-promo-sale', eligible_sale_artworks_count: 1, sale_type: 'auction promo'
        @openPromoAuction = new Auction fabricate 'sale', is_auction: false, auction_state: 'open', id: 'promo-sale', eligible_sale_artworks_count: 1, sale_type: 'auction promo'
        @closedPromoAuction = new Auction fabricate 'sale', is_auction: false, auction_state: 'closed', id: 'closed-promo-sale', eligible_sale_artworks_count: 1, sale_type: 'auction promo'
      ]

    describe 'without user', ->
      before ->
        @res = render: sinon.stub(), locals: sd: {}

      it 'fetches the relevant auction data and renders the index template', (done) ->
        routes.index {}, @res

        Backbone.sync.args[0][1].url.should.containEql '/api/v1/sales'
        Backbone.sync.args[0][2].data.should.eql published: true, size: 30, sort: '-created_at'
        Backbone.sync.args[0][2].success @sales

        Backbone.sync.callCount.should.equal 1

        _.defer =>
          @res.render.args[0][0].should.equal 'index'
          _.pluck(@res.render.args[0][1].pastAuctions, 'id').should.eql [@closedAuction.id, @closedPromoAuction.id]
          _.pluck(@res.render.args[0][1].currentAuctions, 'id').should.eql [@openAuction.id]
          _.pluck(@res.render.args[0][1].upcomingAuctions, 'id').should.eql [@previewAuction.id]
          _.pluck(@res.render.args[0][1].promoAuctions, 'id').should.eql [@previewPromoAuction.id, @openPromoAuction.id]
          @res.render.args[0][1].nextAuction.id.should.eql @previewAuction.id
          done()

    describe 'with user', ->
      before ->
        @req = user: new CurrentUser fabricate 'user'
        @res = render: sinon.stub(), locals: sd: {}

      it 'fetches the relevant auction data in addition to the user bid status and renders the index template', (done) ->
        routes.index @req, @res
        Backbone.sync.args[0][2].success @sales

        _.defer =>
          # Checks to see if you are registered to bid in the upcoming sale
          Backbone.sync.args[1][2].url.should.containEql '/api/v1/me/bidders'
          Backbone.sync.args[1][2].data.sale_id.should.equal 'preview-sale'
          Backbone.sync.args[1][2].success [{}, {}]
          @req.user.get('registered_to_bid').should.be.true
          done()
