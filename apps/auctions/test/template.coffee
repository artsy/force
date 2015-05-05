_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'

describe 'Auctions template', ->
  before ->
    auctions = [
      @openAuction = new Auction fabricate 'sale', auction_state: 'open', id: 'open-auction'
      @closedAuction = new Auction fabricate 'sale', auction_state: 'closed', id: 'closed-auction'
      @previewAuction = new Auction fabricate 'sale', auction_state: 'preview', id: 'preview-auction'
      @promoAuction = new Auction fabricate 'sale', auction_state: 'open', id: 'promo-sale', eligible_sale_artworks_count: 1, sale_type: 'auction promo'
    ]

  describe 'with at least one of every kind of auction', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          asset: (->)
          pastAuctions: [@closedAuction]
          currentAuctions: [@openAuction]
          upcomingAuctions: [@previewAuction]
          promoAuctions: []
          nextAuction: @previewAuction
        done()

    after ->
      benv.teardown()

    it 'renders correctly', ->
      $('.auctions-placeholder').should.have.lengthOf 0
      # Current ("Featured") auctions
      $('.af-name').should.have.lengthOf 1
      # Past auctions
      $('.leader-dots-list-item').should.have.lengthOf 1
      # 'How auctions work' link & Upcoming auctions
      $('.ap-upcoming-item').should.have.lengthOf 2

  xdescribe 'without current auctions', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'
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
      $('.auctions-placeholder').should.have.lengthOf 1
      # Current ("Featured") auctions
      $('.af-name').should.have.lengthOf 0
      # Upcoming & Past auctions
      $('.leader-dots-list-item').should.have.lengthOf 2
      # 'How auctions work' link
      $('.ap-upcoming-item').should.have.lengthOf 1
