benv = require 'benv'
moment = require 'moment'
sinon = require 'sinon'
rewire = require 'rewire'
rewire = require 'rewire'
Backbone = require 'backbone'
Artwork = require '../../../../../models/artwork'
{ fabricate } = require 'antigravity'
_ = require 'underscore'

describe 'Metadata', ->
  fakeEvent =
    preventDefault: -> null
    currentTarget: null

  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), analytics: track: sinon.stub()
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @MetaDataView = rewire('../view.coffee')
    @model =
      new Artwork fabricate 'artwork',
        id: 'peter-alexander-wedge-with-puff'
        is_in_auction: true
        partner:
          type: 'Auction'
        sale:
          id: 'los-angeles-modern-auctions-march-2015'
          name: 'Los Angeles Modern Auctions - March 2015'
          is_open: true
          is_preview: false
          is_closed: false
          is_auction: true
          is_auction_promo: false
          is_with_buyers_premium: true
        sale_artwork:
          id: 'peter-alexander-wedge-with-puff'
          reserve_status: 'reserve_met'
          reserve_message: 'Reserve met'
          estimate: '$7,000–$9,000'
          current_bid: amount: '$55,000'
          counts: bidder_positions: 19
          symbol: '$'
          bid_increments: [100, 200]
          minimum_next_bid:
            amount: '$60,000'
            cents: 6000000

  describe 'buy', ->
    beforeEach ->
      @MetaDataView.__set__
        CurrentUser:
          orNull: ->
            hasLabFeature: (feature) -> feature == 'New Buy Now Flow'
        sd: {}
        errorModal:
          render: () -> {}
          renderBuyNowError: () -> {}
        acquireArtwork: () -> {}

    it 'reroutes to login form when user is not logged in', ->
      locationMock = assign: sinon.spy()
      @MetaDataView.__set__
        createOrder: sinon.stub()
        location: locationMock
        sd:
          ENABLE_NEW_BUY_NOW_FLOW: true
        CurrentUser:
          orNull: ->
            null

      view = new @MetaDataView model: @model
      view.buy(fakeEvent)
      locationMock.assign.callCount.should.equal(1)
      locationMock.assign.calledWith('/login?redirectTo=/artwork/peter-alexander-wedge-with-puff&signupIntent=buy+now&intent=buy+now&trigger=click').should.be.ok()

    it 'should reroute to the buy now form when the buy now feature flag is enabled', ->
      promisedResult = Promise.resolve(ecommerceCreateOrderWithArtwork: orderOrError: order: id: "1234")
      createOrderStub = sinon.stub().returns(promisedResult)
      locationMock = assign: sinon.spy()
      @MetaDataView.__set__
        createOrder: createOrderStub
        location: locationMock
        CurrentUser:
          orNull: ->
            hasLabFeature: (feature) -> feature == 'New Buy Now Flow'

      view = new @MetaDataView model: @model
      view.buy(fakeEvent)
      createOrderStub.callCount.should.equal(1)

      return promisedResult.then( ->
        locationMock.assign.callCount.should.equal(1, 'Expected location.assign to be called once')
        locationMock.assign.calledWith('/orders/1234/shipping').should.be.ok()
      )

    it 'should show an error modal when buy now mutation fails', ->
      promisedResult = Promise.resolve(ecommerceCreateOrderWithArtwork: orderOrError: error: code: "1234")
      createOrderStub = sinon.stub().returns(promisedResult)
      errorModalMock = { render: sinon.spy(), renderBuyNowError: sinon.spy() }
      @MetaDataView.__set__
        errorModal: errorModalMock
        createOrder: createOrderStub
        CurrentUser:
          orNull: ->
            hasLabFeature: (feature) -> feature == 'New Buy Now Flow'

      view = new @MetaDataView model: @model
      view.buy(fakeEvent)
      createOrderStub.callCount.should.equal(1)
      return promisedResult.then( ->
        errorModalMock.renderBuyNowError.calledOnce.should.be.ok()
      )
