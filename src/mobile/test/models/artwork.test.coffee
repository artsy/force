sinon = require 'sinon'
Backbone = require 'backbone'
Artwork = require '../../models/artwork'
Sale = require '../../models/sale'
{ fabricate } = require '@artsy/antigravity'

describe 'Artwork', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate 'artwork'

  afterEach ->
    Backbone.sync.restore()

  describe '#defaultImageUrl', ->

    it 'returns the first medium image url by default', ->
      @artwork.defaultImageUrl().should.match(
        /// /local/additional_images/.*/medium.jpg ///
      )

    it 'works if there are no images', ->
      @artwork.set images: []
      @artwork.defaultImageUrl().should.equal '/images/missing_image.png'

  describe '#showPriceLabel', ->

    it 'shows the prices label if theres a price, no ediitons, and inquireable', ->
      @artwork.set price: '1000', edition_sets: [], inquireable: true
      @artwork.showPriceLabel().should.be.ok()

    it 'doesnt shows the prices label if theres no price', ->
      @artwork.set price: null, edition_sets: [], inquireable: false
      @artwork.showPriceLabel().should.not.be.ok()

    it 'shows the label for artworks that are contact for price', ->
      @artwork.set price: '', sale_message: 'Contact For Price', edition_sets: [], inquireable: true
      @artwork.showPriceLabel().should.be.ok()

  describe "#showNotForSaleLabel", ->

    it 'shows the not for sale label if inquireable and not for sale', ->
      @artwork.set inquireable: true, availability: 'not for sale'
      @artwork.showNotForSaleLabel().should.be.ok()

  describe '#editionSets', ->

    it 'wraps the edition sets in a collection', ->
      @artwork.set edition_sets: [{ foo: 'bar' }]
      @artwork.editionSets().first().get('foo').should.equal 'bar'

  describe '#partnerHref', ->

    it 'blank with collecting institution and profile', ->
      @artwork.set
        collecting_institution: 'foobar'
        partner:
          profile: fabricate('profile')
      @artwork.partnerHref().should.equal ''

    it 'links to the profile page second', ->
      @artwork.set
        collecting_institution: null
        partner:
          has_full_profile: true
          default_profile_id: 'foobaz'
      @artwork.partnerHref().should.equal '/foobaz'

    it 'links to website last', ->
      @artwork.set
        collecting_institution: null
        partner:
          has_full_profile: false,
          default_profile_id: 'foobaz'
          website: 'moobarz.com'
      @artwork.partnerHref().should.equal 'moobarz.com'

    it 'without any collecting_institution, profile page, or website, returns empty string', ->
      @artwork.set
        collecting_institution: null
        partner:
          has_full_profile: null,
          default_profile_id: null
          website: null
      @artwork.partnerHref().should.equal ''

  describe '#partnerName', ->

    it 'shows collecting institution first', ->
      @artwork.set
        collecting_institution: 'Österreichische Galerie Belvedere, Vienna'
      @artwork.partnerName().should.equal("Österreichische Galerie Belvedere, Vienna")

  describe '#fetchCurrentSale', ->

    it 'returns the first sale', (done) ->
      @artwork.fetchCurrentSale success: (sale) ->
        sale.toJSON().name.should.equal 'First Sale'
        done()
      sale1 = new Sale { is_auction: false, name: 'First Sale' }
      sale2 = new Sale { is_auction: false, name: 'Second Sale' }
      Backbone.sync.args[0][2].success [sale1, sale2]

  describe '#fetchAuctionAndSaleArtwork', ->

    it 'selects the sale that is an auction', (done) ->
      @artwork.fetchAuctionAndSaleArtwork success: (auction, saleArtwork) ->
        auction.toJSON().name.should.equal 'An Auction'
        auction.toJSON().is_auction.should.equal true
        done()
      sale1 = new Sale { is_auction: false, name: 'Not An Auction' }
      sale2 = new Sale { is_auction: true, name: 'An Auction' }
      Backbone.sync.args[0][2].success [sale1, sale2]
      Backbone.sync.args[1][2].success fabricate 'sale_artwork', opening_bid_cents: 100000

    it 'fetchs the auction and sale for that artwork and callsback with both', (done) ->
      @artwork.fetchAuctionAndSaleArtwork success: (auction, saleArtwork) ->
        saleArtwork.toJSON().opening_bid_cents.should.equal 100000
        done()
      Backbone.sync.args[0][2].success [fabricate 'sale', is_auction: true, name: 'Awesome Sale']
      Backbone.sync.args[1][2].success fabricate 'sale_artwork', opening_bid_cents: 100000

    it 'injects the sale into the sale artwork to complete its url', (done) ->
      @artwork.fetchAuctionAndSaleArtwork success: (auction, saleArtwork) ->
        saleArtwork.toJSON().sale.get('is_auction').should.be.ok()
        done()
      Backbone.sync.args[0][2].success [fabricate 'sale', is_auction: true, name: 'Awesome Sale']
      Backbone.sync.args[1][2].success fabricate 'sale_artwork', opening_bid_cents: 100000

  describe '#hasMoreInfo', ->

    it 'returns true if the artwork has more info to display and false otherwise', ->
      @artwork.hasMoreInfo().should.be.true()
      @artwork.set
        provenance: ''
        exhibition_history: ''
        signature: ''
        additional_information: ''
        literature: ''
      @artwork.hasMoreInfo().should.be.false()

  describe '#saleMessage', ->
    it 'formats sold sale message', ->
      @artwork.set sale_message: '$6,000 - Sold', price: '$6,000'
      @artwork.saleMessage().should.equal 'Sold — $6,000'
      @artwork.set sale_message: '$6,000'
      @artwork.saleMessage().should.equal '$6,000'

  describe '#availableForSale', ->

    it "shows if the artwork is for sale", ->
      @artwork.set availability: 'for sale'
      @artwork.availableForSale().should.be.ok()

    it "doesn't show artworks that are 'sold'", ->
      @artwork.set availability: 'sold'
      @artwork.availableForSale().should.be.false()

    it "doesn't show artworks that are 'on hold'", ->
      @artwork.set availability: 'on hold'
      @artwork.availableForSale().should.be.false()

    it "doesn't show artworks that are 'not for sale'", ->
      @artwork.set availability: 'not for sale'
      @artwork.availableForSale().should.be.false()
