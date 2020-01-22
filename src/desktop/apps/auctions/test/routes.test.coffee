_ = require 'underscore'
Q = require 'bluebird-q'
sinon = require 'sinon'
moment = require 'moment'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Auction = require '../../../models/auction'
CurrentUser = require '../../../models/current_user'
rewire = require 'rewire'
routes = rewire '../routes'

describe 'Auctions routes', ->
  beforeEach ->
    sinon.stub(Backbone, 'sync').returns Q.resolve()

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    before ->
      @sales = [
        @sneakyOpenSale = new Auction fabricate 'sale', is_auction: false, auction_state: 'open', id: 'sneaky-open-sale', eligible_sale_artworks_count: 1
        @sneakyPastSale = new Auction fabricate 'sale', is_auction: false, auction_state: 'closed', id: 'sneaky-past-sale', eligible_sale_artworks_count: 1

        @openAuction = new Auction fabricate 'sale', is_auction: true, auction_state: 'open', id: 'open-sale', eligible_sale_artworks_count: 1
        @closedAuction = new Auction fabricate 'sale', is_auction: true, auction_state: 'closed', id: 'closed-sale', eligible_sale_artworks_count: 1

        @middlePreviewAuction = new Auction fabricate 'sale', is_auction: true, auction_state: 'preview', id: _.uniqueId('preview-sale'), eligible_sale_artworks_count: 1, start_at: moment().add(3, 'days').format()
        @soonestPreviewAuction = new Auction fabricate 'sale', is_auction: true, auction_state: 'preview', id: _.uniqueId('preview-sale'), eligible_sale_artworks_count: 1, start_at: moment().add(1, 'days').format()
        @latestPreviewAuction = new Auction fabricate 'sale', is_auction: true, auction_state: 'preview', id: _.uniqueId('preview-sale'), eligible_sale_artworks_count: 1, start_at: moment().add(20, 'days').format()

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
        Backbone.sync.args[0][2].data.should.eql published: true, size: 100, sort: '-timely_at,name'
        Backbone.sync.args[0][2].success @sales

        Backbone.sync.callCount.should.equal 1

        _.defer => _.defer =>
          @res.render.args[0][0].should.equal 'index'
          _.pluck(@res.render.args[0][1].pastAuctions, 'id').should.eql [@closedAuction.id, @closedPromoAuction.id]
          _.pluck(@res.render.args[0][1].currentAuctions, 'id').should.eql [@openAuction.id]
          _.pluck(@res.render.args[0][1].upcomingAuctions, 'id').should.eql [@soonestPreviewAuction.id, @middlePreviewAuction.id, @latestPreviewAuction.id]
          _.pluck(@res.render.args[0][1].promoAuctions, 'id').should.eql [@previewPromoAuction.id, @openPromoAuction.id]
          @res.render.args[0][1].nextAuction.id.should.eql @soonestPreviewAuction.id
          done()

    describe 'with user', ->
      before ->
        @req = user: new CurrentUser fabricate 'user'
        @res = render: sinon.stub(), locals: sd: {}
        routes.__set__ 'metaphysics', ->
          Q.promise (resolve, reject) ->
            return resolve { me: [] }

      it 'fetches the relevant auction data in addition to the user bid status and renders the index template', (done) ->
        routes.index @req, @res
        Backbone.sync.args[0][2].success @sales

        _.defer => _.defer =>
          # Checks to see if you are registered to bid in the upcoming sale
          Backbone.sync.args[1][2].url.should.containEql '/api/v1/me/bidders'
          Backbone.sync.args[1][2].data.sale_id.should.equal @soonestPreviewAuction.id
          Backbone.sync.args[1][2].success [{}, {}]
          @req.user.get('registered_to_bid').should.be.true()
          done()
