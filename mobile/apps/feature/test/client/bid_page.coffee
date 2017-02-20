_ = require 'underscore'
benv = require 'benv'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
SaleArtwork = require '../../../../models/sale_artwork'
Artwork = require '../../../../models/artwork'
Sale = require '../../../../models/sale'
CurrentUser = require '../../../../models/current_user'
{ resolve } = require 'path'

describe 'BidPageView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/bid_page.jade'), {
        sd: {}
        artwork: new Artwork fabricate 'artwork'
        saleArtwork: new SaleArtwork fabricate 'sale_artwork'
        auction: new Sale fabricate 'sale'
        registered: true
        bidIncrements: []
        accounting: formatMoney: ->
      }, =>
        { @BidPageView, @init } = require '../../client/bid_page'
        saleArtwork = new SaleArtwork fabricate 'sale_artwork',
          artwork: fabricate('artwork')
          sale: fabricate('sale')
        sinon.stub @BidPageView.prototype, 'renderUnqualifiedWarning'
        @view = new @BidPageView
          el: 'body'
          saleArtwork: saleArtwork
          user: new CurrentUser
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()
    try @BidPageView::renderUnqualifiedWarning.restore()

  describe '#onSubmit', ->

    it 'shows an error if the bid is below minimum', ->
      @view.onError = sinon.stub()
      @view.$('input[type=text]').val '$200'
      @view.saleArtwork.set minimum_next_bid_cents: 30000, display_minimum_next_bid_dollars: '$300'
      @view.onSubmit()
      @view.onError.args[0][0].should.containEql 'Your bid must be at least $300'

  describe '#submitBid', ->
    beforeEach ->
      @view.saleArtwork.set minimum_next_bid_cents: 20000, display_minimum_next_bid_dollars: '$200'
      @view.inputValCents = -> 30000

      it 'places a bid', ->
        @view.onSubmit()
        # Create of bidder position
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/bidder_position'

    describe 'polling', ->
      beforeEach ->
        @view.window = {}
        @view.onSubmit()
        # Create of bidder position
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/bidder_position'
        Backbone.sync.args[0][2].success(id: 'cat')

      it 'polls for the bid position', ->
        # Poll of just-created position
        Backbone.sync.args[1][0].should.equal 'read'
        Backbone.sync.args[1][2].url.should.containEql '/api/v1/me/bidder_position/cat'

      it 'redirects to the confirm bid page after successful polling', ->
        Backbone.sync.args[1][2].success(processed_at: '2015-04-20T16:20:00-05:00', active: true)
        @view.window.location.should.containEql '#confirm-bid'

  describe '#renderUnqualifiedWarning', ->

    it 'renders an unqualified message for `qualified_for_bidding = false`', ->
      @BidPageView::renderUnqualifiedWarning.restore()
      @view.saleArtwork.set sale: id: 'foo-bar-auction'
      @view.renderUnqualifiedWarning()
      _.last(Backbone.sync.args)[2].success [{
        id: 'foo'
        sale: fabricate('sale', id: 'foo-bar-auction')
      }]
      _.last(Backbone.sync.args)[2].success {
        id: 'foo'
        sale: fabricate('sale', id: 'foo-bar-auction')
        qualified_for_bidding: false
      }
      $('.alert').html().should.containEql 'we need additional'
