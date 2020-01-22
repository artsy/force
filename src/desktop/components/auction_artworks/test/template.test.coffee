_ = require 'underscore'
$ = require 'cheerio'
jade = require 'jade'
{ fabricate } = require '@artsy/antigravity'
Auction = require '../../../models/auction'
Artwork = require '../../../models/artwork'

templates =
  grid: jade.compileFile(require.resolve '../templates/artwork/grid.jade')
  list: jade.compileFile(require.resolve '../templates/artwork/list.jade')

describe 'templates', ->
  beforeEach ->
    @artwork = new Artwork fabricate 'artwork'
    @auction = new Auction fabricate 'sale', is_auction: true

  describe 'biddable artwork', ->
    describe 'open auction', ->
      beforeEach ->
        @auction.set auction_state: 'open'
        @artwork.set acquireable: false, sold: false, sale_artwork: highest_bid_amount_cents: 100000, display_highest_bid_amount_dollars: '$1,000'
        @data = _.extend {}, { artwork: @artwork, auction: @auction }, @artwork.related()

      describe 'list', ->
        it 'renders correctly', ->
          $template = $(templates.list @data)
          $template.find('.ala-bid-status strong').text().should.equal 'Current Bid: '
          $template.find('.ala-current-bid').text().should.equal '$1,000'
          $template.find('.ala-bid-count').text().should.equal ''
          $template.find('.js-bid-button').text().should.equal 'Bid'

      describe 'grid', ->
        it 'renders correctly', ->
          $template = $(templates.grid @data)
          $template.find('.aabs-label').text().should.equal 'Current Bid '
          $template.find('.aabs-price').first().text().should.equal '$1,000' # `last` contains a nbsp; for spacing hack
          $template.find('.js-bid-button').text().should.equal 'Bid'

    describe 'closed auction', ->
      beforeEach ->
        @auction.set auction_state: 'closed'
        @artwork.set acquireable: false, sold: false, sale_artwork: highest_bid_amount_cents: 100000
        @data = _.extend {}, { artwork: @artwork, auction: @auction }, @artwork.related()

      describe 'list', ->
        it 'renders correctly', ->
          $template = $(templates.list @data)
          $template.find('.ala-bid-status').should.have.lengthOf 0
          $template.find('.ala-bid-count').should.have.lengthOf 0
          $template.find('.avant-garde-button').text().should.equal 'Auction Closed'

      describe 'grid', ->
        it 'renders correctly', ->
          $template = $(templates.grid @data)
          $template.find('.aga-bid-status').length.should.equal 0
          $template.find('.js-bid-button').should.have.lengthOf 0
          $template.find('.avant-garde-button').text().should.equal 'Auction Closed'

  describe 'auction promo', ->
    describe 'preview state', ->
      beforeEach ->
        @auction.set auction_state: 'preview', sale_type: 'auction promo'
        @auction.isAuctionPromo().should.be.true()
        @data = _.extend {}, { artwork: @artwork, auction: @auction }, @artwork.related()

      describe 'list', ->
        it 'renders correctly', ->
          $template = $(templates.list @data)
          $template.find('.ala-bid-status').should.have.lengthOf 0
          $template.find('.ala-bid-count').should.have.lengthOf 0
          $template.find('.js-inquiry-button').text().should.equal 'Contact Auction House'

      describe 'grid', ->
        it 'renders correctly', ->
          $template = $(templates.grid @data)
          $template.find('.aabs-label').should.have.lengthOf 0
          $template.find('.aabs-price').should.have.lengthOf 0
          $template.find('.js-inquiry-button').text().should.equal 'Contact Auction House'

    describe 'open or closed state', ->
      beforeEach ->
        @auction.set auction_state: 'open', sale_type: 'auction promo'
        @auction.isAuctionPromo().should.be.true()
        @data = _.extend {}, { artwork: @artwork, auction: @auction }, @artwork.related()

      describe 'list', ->
        it 'renders correctly', ->
          $template = $(templates.list @data)
          $template.find('.ala-bid-status').should.have.lengthOf 0
          $template.find('.ala-bid-count').should.have.lengthOf 0
          $template.find('.js-inquiry-button').should.have.lengthOf 0

      describe 'grid', ->
        it 'renders correctly', ->
          $template = $(templates.grid @data)
          $template.find('.aabs-label').should.have.lengthOf 0
          $template.find('.aabs-price').should.have.lengthOf 0
          $template.find('.js-inquiry-button').should.have.lengthOf 0

  describe 'acquireable', ->
    describe 'open auction; acquireable work; not sold', ->
      beforeEach ->
        @auction.set 'auction_state', 'open'
        @artwork.set acquireable: true, sold: false, sale_message: '$10,000'
        @data = _.extend {}, { artwork: @artwork, auction: @auction }, @artwork.related()

      describe 'list', ->
        it 'renders correctly', ->
          $template = $(templates.list @data)
          $template.find('.ala-current-bid').text().should.equal '$10,000'
          $template.find('.ala-bid-count').text().should.equal '' # Can still bid on it
          $template.find('.js-acquire-button').text().should.equal 'Buy now'

      describe 'grid', ->
        it 'renders correctly', ->
          $template = $(templates.grid @data)
          $template.find('.aabs-label').text().should.equal 'Starting Bid Buy now price'
          $template.find('.aabs-price').text().should.equal '$10,000'
          $template.find('.js-acquire-button').text().should.equal 'Buy now'

    describe 'open auction; acquireable work; is sold', ->
      beforeEach ->
        @auction.set 'auction_state', 'open'
        @artwork.set acquireable: true, sold: true, sale_message: '$10,000'
        @data = _.extend {}, { artwork: @artwork, auction: @auction }, @artwork.related()

      describe 'list', ->
        it 'renders correctly', ->
          $template = $(templates.list @data)
          $template.find('.ala-bid-count').text().should.equal '' # Can still bid on it
          $template.find('.avant-garde-button').text().should.equal 'Sold'

      describe 'grid', ->
        it 'renders correctly', ->
          $template = $(templates.grid @data)
          $template.find('.aabs-label').text().should.equal 'Starting Bid Buy now price'
          $template.find('.aabs-price').text().should.equal 'Sold'
          $template.find('.js-acquire-button').should.have.lengthOf 0
          $template.find('.avant-garde-button').text().should.equal 'Sold'
