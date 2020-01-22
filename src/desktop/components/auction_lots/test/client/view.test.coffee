benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
Artist = require '../../../../models/artist'
AuctionLot = require '../../../../models/auction_lot'
AuctionLots = require '../../../../collections/auction_lots'
Artworks = require '../../../../collections/artworks'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

xdescribe 'Auction results client-side code', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  before (done) ->
    @lot = new AuctionLot fabricate 'auction_result'
    @artist = new Artist fabricate 'artist'
    @artworks = new Artworks [fabricate 'artwork']
    @auctionLots = new AuctionLots [@lot], state: totalRecords: 1

    benv.render resolve(__dirname, '../../templates/detail.jade'), {
      sd: {}
      lot: @lot
      artist: @artist
      artworks: @artworks
      auctionLots: @auctionLots
      asset: (->)
    }, =>
      AuctionResultsView = benv.requireWithJadeify (resolve __dirname, '../../client/view'), []

      AuctionResultsView.__set__ 'zoom', @zoomStub = sinon.stub()
      AuctionResultsView.__set__ 'FillwidthView', Backbone.View
      AuctionResultsView.__get__('FillwidthView')::hideSecondRow = (@hideSecondRowStub = sinon.stub())
      AuctionResultsView.__set__ 'mediator', (@mediatorStub = trigger: sinon.stub())
      done()

      @view = new AuctionResultsView { el: $('body'), model: new Artist fabricate 'artist' }

  describe '#zoomImage', ->
    it 'should instantiate a new zoom when a thumbnail is clicked', ->
      @zoomStub.called.should.be.false()
      @view.$('.auction-lot-image-zoom').click()
      @zoomStub.called.should.be.true()

    it 'passes the original sized image to the zoom', ->
      @view.$('.auction-lot-image-zoom').click()
      @zoomStub.args[0][0].should.equal @auctionLots.at(0).imageUrl('original')

  describe '#onRowClick', ->
    it 'intercepts any clicks to the row if the user is logged out', ->
      @mediatorStub.trigger.called.should.be.false()
      @view.user = null
      @view.$('.auction-lot').first().click()
      @mediatorStub.trigger.args[0][0].should.equal 'open:auth'
      @mediatorStub.trigger.args[0][1].mode.should.equal 'signup'
      @view.$('.auction-lot').first().click()
      @mediatorStub.trigger.calledTwice.should.be.true()
      # 'logged in'
      @view.user = 'existy'
      @view.$('.auction-lot').first().click()
      @mediatorStub.trigger.calledThrice.should.be.false()
