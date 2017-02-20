_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../../../models/artist'
{ fabricate } = require 'antigravity'
sinon = require 'sinon'
benv = require 'benv'
{ resolve } = require 'path'
CurrentUser = require '../../../models/current_user'

describe 'ArtistAuctionResultsView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      $.onInfiniteScroll = sinon.stub()
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/auction_results.jade'), {
        artist: new Artist(fabricate 'artist'),
        sd: { USER_AGENT: 'cat' },
        asset: (->)
        auctionResults: [ new Backbone.Model(fabricate 'auction_result') ],
        totalCount: 420
      }, =>
        { ArtistAuctionResultsView } = benv.requireWithJadeify resolve(__dirname, '../client/auction_results'), [ 'auctionResultTemplate' ]
        @view = new ArtistAuctionResultsView el: $('body'), model: new Artist(fabricate 'artist')
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#resetAuctionLots', ->

    it 'fetches the auction lots with the params', ->
      @view.auctionParams.foo = 'bar'
      @view.resetAuctionLots()
      Backbone.sync.args[0][2].data.foo.should.equal 'bar'

  describe '#sortAuctionLots', ->

    it 'sorts the artworks based on the select value', ->
      @view.$('#artist-auction-results-sort select').val 'date,-auction_date'
      @view.sortAuctionLots()
      Backbone.sync.args[0][2].data.sort.should.equal 'date,-auction_date'

