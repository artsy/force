_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'
CurrentUser = require '../../../models/current_user'
routes = require '../routes'

describe 'Auctions routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    before ->
      @sales = [
        @openAuction = new Auction fabricate 'sale', auction_state: 'open', id: 'open-sale', eligible_sale_artworks_count: 1
        @closedAuction = new Auction fabricate 'sale', auction_state: 'closed', id: 'closed-sale', eligible_sale_artworks_count: 1
        @previewAuction = new Auction fabricate 'sale', auction_state: 'preview', id: 'preview-sale', eligible_sale_artworks_count: 1
        @previewPromoAuction = new Auction fabricate 'sale', auction_state: 'preview', id: 'preview-promo-sale', eligible_sale_artworks_count: 1, sale_type: 'auction promo'
        @promoAuction = new Auction fabricate 'sale', auction_state: 'open', id: 'promo-sale', eligible_sale_artworks_count: 1, sale_type: 'auction promo'
      ]

    describe 'without user', ->
      before ->
        @res = render: sinon.stub(), locals: sd: {}

      it 'fetches the relevant auction data and renders the index template', (done) ->
        routes.index {}, @res

        Backbone.sync.args[0][1].url.should.containEql '/api/v1/sales?is_auction=true'
        Backbone.sync.args[0][2].data.should.eql published: true, size: 20, sort: '-created_at'
        Backbone.sync.args[0][2].success @sales

        Backbone.sync.callCount.should.equal 2

        @res.locals.sd.CURRENT_AUCTIONS.should.eql [@openAuction]

        # Fetches the set that contains the feature of the open sale
        Backbone.sync.args[1][2].url.should.containEql '/api/v1/sets/contains?item_type=Sale&item_id=open-sale'
        # Passes down the owner (Feature)
        Backbone.sync.args[1][2].success [owner: id: 'open-sale-feature-id']
        # Fetches that feature
        Backbone.sync.args[2][1].url().should.containEql '/api/v1/feature/open-sale-feature-id'
        Backbone.sync.args[2][2].success fabricate 'feature'

        _.defer =>
          @res.render.args[0][0].should.equal 'index'
          @res.render.args[0][1].pastAuctions.should.eql [@closedAuction]
          @res.render.args[0][1].currentAuctions.should.eql [@openAuction]
          @res.render.args[0][1].upcomingAuctions.should.eql [@previewAuction]
          @res.render.args[0][1].promoAuctions.should.eql [@previewPromoAuction, @promoAuction]
          @res.render.args[0][1].nextAuction.should.eql @previewAuction
          done()

    describe 'with user', ->
      before ->
        @req = user: new CurrentUser fabricate 'user'
        @res = render: sinon.stub(), locals: sd: {}

      it 'fetches the relevant auction data in addition to the user bid status and renders the index template', ->
        routes.index @req, @res

        Backbone.sync.args[0][1].url.should.containEql '/api/v1/sales?is_auction=true'
        Backbone.sync.args[0][2].data.should.eql published: true, size: 20, sort: '-created_at'
        Backbone.sync.args[0][2].success @sales

        Backbone.sync.args[1][2].url.should.containEql '/api/v1/sets/contains?item_type=Sale&item_id=open-sale'
        Backbone.sync.args[1][2].success [owner: id: 'open-sale-feature-id']

        # Checks to see if you are registered to bid in the upcoming sale
        Backbone.sync.args[2][2].url.should.containEql '/api/v1/me/bidders'
        Backbone.sync.args[2][2].data.sale_id.should.equal 'preview-sale'
        Backbone.sync.args[2][2].success [{}, {}]
        @req.user.get('registered_to_bid').should.be.true

        Backbone.sync.args[3][1].url().should.containEql '/api/v1/feature/open-sale-feature-id'
        Backbone.sync.args[3][2].success fabricate 'feature'
