_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Auction = require '../../../models/sale'
Artworks = require '../../../collections/artworks'
AuctionArtworkListView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'AuctionArtworkListView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @auction = new Auction fabricate 'sale', is_auction: true
    @artworks = new Artworks [
      fabricate('artwork',
        id: 'three-bids'
        sale_artwork: bidder_positions_count: 3
        artist: sortable_id: 'z'
      )
      fabricate('artwork',
        id: 'one-bid',
        sale_artwork: bidder_positions_count: 1
        artist: sortable_id: 'a'
      )
    ]
    @view = new AuctionArtworkListView model: @auction, collection: @artworks
    @view.render()

  it 'renders correctly', ->
    @view.$('.aal-amount').text().should.equal '2 Lots'

  it 'does not render bid number if the auction is closed', ->
    @view.model.isClosed = -> true
    @view.render()
    @view.$('.aali-bid-count').length.should.not.be.above 0

  it 'handles sorts', ->
    @view.state.set 'sort', 'name_asc'
    @view.$('.auction-artwork-list-item').first().attr('href').should.containEql 'one-bid'
    @view.state.set 'sort', 'bids_desc'
    @view.$('.auction-artwork-list-item').first().attr('href').should.containEql 'three-bids'
    @view.state.set 'sort', 'bids_asc'
    @view.$('.auction-artwork-list-item').first().attr('href').should.containEql 'one-bid'
