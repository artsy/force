_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Auction = require '../../../models/auction'
moment = require 'moment'

describe 'Auctions template', ->
  before ->
    auctions = [
      @openAuction = new Auction fabricate 'sale', auction_state: 'open', id: 'open-auction', end_at: moment().add(2, 'days')
      @closedAuction = new Auction fabricate 'sale', auction_state: 'closed', id: 'closed-auction'
      @previewAuction = new Auction fabricate 'sale', auction_state: 'preview', id: 'preview-auction'
      @promoAuction = new Auction fabricate 'sale', auction_state: 'open', id: 'promo-sale', eligible_sale_artworks_count: 1, sale_type: 'auction promo'
      @openLiveAuction = new Auction fabricate 'sale', auction_state: 'open', id: 'live-auction', live_start_at: moment().subtract(1, 'days')
    ]

  describe 'with at least one of every kind of auction', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          asset: (->)
          pastAuctions: [@closedAuction]
          currentAuctions: [@openAuction, @openLiveAuction]
          upcomingAuctions: [@previewAuction]
          promoAuctions: []
          nextAuction: @previewAuction
        , ->
          done()

    after ->
      benv.teardown()

    it 'renders correctly', ->
      $('.auctions-placeholder').length.should.eql 0
      # Current ("Featured") auctions
      $('.af-name').length.should.eql 2
      # Past auctions
      $('.leader-dots-list-item').length.should.eql 1
      # Upcoming auctions
      $('.ap-upcoming-item').length.should.eql 1
      # How Auctions Work
      $('.auction-cta-group').length.should.eql 3
      # Live auction
      $('.af-live-header').length.should.eql 1

    it 'shows the correct clocks', ->
      $($('.af-sale-time')[1]).text().should.eql 'Live bidding now open'


  xdescribe 'without current auctions', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          asset: (->)
          pastAuctions: [@closedAuction]
          currentAuctions: []
          upcomingAuctions: [@previewAuction]
          promoAuctions: []
          nextAuction: @previewAuction
        done()

    after ->
      benv.teardown()

    it 'renders correctly', ->
      $('.auctions-placeholder').length.should.eql 1
      # Current ("Featured") auctions
      $('.ap-featured-item').length.should.eql 0
      # Upcoming & Past auctions
      $('.auctions-list--upcoming').length.should.eql 1
