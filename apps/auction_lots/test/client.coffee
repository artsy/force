rewire        = require 'rewire'
benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
Artist        = require '../../../models/artist'
AuctionLots   = require '../../../collections/auction_lots'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'

describe 'Auction results client-side code', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    # benv.teardown()

  beforeEach (done) ->
    @artist       = new Artist fabricate 'artist'
    @auctionLots  = new AuctionLots([fabricate 'auction_result'], { state: { totalRecords: 1 }})

    benv.render resolve(__dirname, '../templates/artist.jade'), {
      sd: {}
      artist: @artist
      auctionLots: @auctionLots
    }, =>
      { AuctionResultsView, @init } = mod = benv.requireWithJadeify(
        (resolve __dirname, '../client'), []
      )

      mod.__set__ 'ZoomView', @zoomStub = sinon.stub()
      mod.__set__ 'ShareView', @shareStub = sinon.stub()
      mod.__set__ 'FollowButton', @followButtonStub = sinon.stub()
      mod.__set__ 'sd', { CURRENT_USER: true }

      @view = new AuctionResultsView { el: $('body'), model: new Artist fabricate 'artist' }

      done()

  afterEach ->
    @view.undelegateEvents()

  describe '#setupShareButtons', ->
    it 'sets up the share buttons', ->
      html = @shareStub.args[0][0].el.html()
      html.should.include 'Post to Facebook'
      html.should.include 'Share on Twitter'
      html.should.include 'Pin It on Pinterest'

  describe '#setupFollowButton', ->
    it 'sets up the follow button', ->
      @followButtonStub.called.should.be.ok

  describe '#zoomImage', ->
    it 'should instantiate a new ZoomView when a thumbnail is clicked', ->
      @zoomStub.called.should.not.be.ok
      @view.$('.auction-lot-image-zoom').click()
      @zoomStub.called.should.be.ok

    it 'passes the original sized image to the ZoomView', ->
      @view.$('.auction-lot-image-zoom').click()
      @zoomStub.args[0][0].imgSrc.should.equal @auctionLots.at(0).imageUrl('original')

