_ = require 'underscore'
sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Artwork = require '../../models/artwork'

describe 'Artwork', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate('artwork'), parse: true

  afterEach ->
    Backbone.sync.restore()

  describe '#saleMessage', ->
    it 'returns sold when artwork is sold (w/ or w/o price)', ->
      @artwork.set sale_message: '$6,000 - Sold'
      @artwork.saleMessage().should.equal 'Sold'
      @artwork.set sale_message: 'Sold'
      @artwork.saleMessage().should.equal 'Sold'

    it 'returns On loan when artwork is on loan', ->
      @artwork.set availability: 'on loan'
      @artwork.saleMessage().should.equal 'On loan'

    it 'returns the price when on hold', ->
      @artwork.set availability: 'on hold', price: '$420'
      @artwork.saleMessage().should.equal '$420, on hold'
      @artwork.unset 'price'
      @artwork.saleMessage().should.equal 'On hold'

    describe 'sale_message is "Contact for Price" or availability is "not for sale" or "permanent collection"', ->
      it 'returns undefined', ->
        @artwork.set availability: 'permanent collection'
        _.isUndefined(@artwork.saleMessage()).should.be.true()
        @artwork.set sale_message: 'Contact For Price', price: '$6,000', availability: 'for sale'
        _.isUndefined(@artwork.saleMessage()).should.be.true()
        @artwork.unset 'sale_message', 'price'
        @artwork.set availability: 'not for sale'
        _.isUndefined(@artwork.saleMessage()).should.be.true()

  describe '#downloadableFilename', ->
    it 'returns a human readable filename', ->
      @artwork.downloadableFilename().should.equal 'andy-warhol-skull-1999.jpg'

  describe '#downloadableUrl', ->
    describe 'as a normal user', ->
      it 'returns the URL to the "larger" file', ->
        @artwork.downloadableUrl().should.containEql 'larger.jpg'
        @artwork.downloadableUrl(isAdmin: -> false).should.containEql 'larger.jpg'

    describe 'as an admin', ->
      it 'returns the URL to the "original" file', ->
        @artwork.downloadableUrl(isAdmin: -> true).should.containEql 'original.jpg'

  describe 'display conditions:', ->
    describe 'can be downloadable', ->
      it 'is downloadable if it is downloadable', ->
        @artwork.defaultImage().set 'downloadable', false
        @artwork.isDownloadable().should.be.false()
        @artwork.defaultImage().set 'downloadable', true
        @artwork.isDownloadable().should.be.true()

      it 'is downloadable no matter what if the user is an admin', ->
        @artwork.defaultImage().set 'downloadable', false
        @artwork.isDownloadable().should.be.false()
        @artwork.isDownloadable(isAdmin: -> false).should.be.false()
        @artwork.isDownloadable(isAdmin: -> true).should.be.true()

    it 'can have a price displayed', ->
      sinon.stub(@artwork, 'isMultipleEditions').returns false
      sinon.stub(@artwork, 'isUnavailableButInquireable').returns false
      @artwork.set { price: 'existy', inquireable: true }
      @artwork.isPriceDisplayable().should.be.true()
      @artwork.set { inquireable: false, sold: true }
      @artwork.isPriceDisplayable().should.be.true()
      @artwork.set { inquireable: false, sold: false }
      @artwork.isPriceDisplayable().should.be.false()
      @artwork.set { inquireable: true, price: undefined }
      @artwork.isPriceDisplayable().should.be.false()
      @artwork.set { inquireable: true, price: 'existy' }
      @artwork.isPriceDisplayable().should.be.true()
      @artwork.isMultipleEditions.restore()
      @artwork.isUnavailableButInquireable.restore()

    it 'can have multiple editions', ->
      @artwork.set 'edition_sets', undefined
      @artwork.isMultipleEditions().should.be.false()
      @artwork.set 'edition_sets', [0]
      @artwork.isMultipleEditions().should.be.false()
      @artwork.set 'edition_sets', [0, 0]
      @artwork.isMultipleEditions().should.be.true()

    it 'normalizes dimensions', ->
      @artwork.set dimensions: cm: '10 × 200 × 30cm'
      @artwork.normalizedDimensions().should.eql [10, 200, 30]
      @artwork.set dimensions: cm: '10 × 200 × 30'
      @artwork.normalizedDimensions().should.eql [10, 200, 30]
      @artwork.set dimensions: cm: '101 × 20cm'
      @artwork.normalizedDimensions().should.eql [101, 20]
      @artwork.set dimensions: cm: '1525cm'
      @artwork.normalizedDimensions().should.eql [1525]

    it 'might be too big (more than 1524 cmches on a side)', ->
      @artwork.set dimensions: cm: '10 × 20cm'
      @artwork.tooBig().should.be.false()
      @artwork.set dimensions: cm: '1524 × 1524cm'
      @artwork.tooBig().should.be.false()
      @artwork.set dimensions: cm: '1524.5 × 1524cm'
      @artwork.tooBig().should.be.true()
      @artwork.set dimensions: cm: '1524 × 1525cm'
      @artwork.tooBig().should.be.true()

    it 'can be hung', ->
      @artwork.set { depth: undefined, height: 1, width: '1' }
      @artwork.set 'category', 'Design'
      @artwork.isHangable().should.be.false()
      @artwork.set 'category', 'Painting'
      @artwork.isHangable().should.be.true()
      @artwork.set 'depth', 1
      @artwork.isHangable().should.be.false()
      @artwork.unset 'depth'
      @artwork.set dimensions: cm: '1524 × 20cm'
      @artwork.isHangable().should.be.true()
      @artwork.set dimensions: cm: '1525 × 20cm'
      @artwork.isHangable().should.be.false()
      @artwork.set dimensions: cm: '1524 × 20cm'
      @artwork.isHangable().should.be.true()
      @artwork.set 'diameter', 1
      @artwork.isHangable().should.be.false()

    describe '#isPartOfAuction', ->
      beforeEach ->
        @artwork.related().sales.reset()

      it 'returns true if the artwork has a related auction', ->
        @artwork.isPartOfAuction().should.be.false()
        # Adds a promo
        @artwork.related().sales.add sale_type: 'auction promo', auction_state: 'preview'
        @artwork.isPartOfAuction().should.be.false()
        # Adds auction
        @artwork.related().sales.add is_auction: true
        @artwork.isPartOfAuction().should.be.true()

    describe '#isPartOfAuctionPromo', ->
      beforeEach ->
        @artwork.related().sales.reset()

      it 'might be part of an auction promo', ->
        @artwork.related().sales.add is_auction: true
        @artwork.isPartOfAuctionPromo().should.be.false()
        @artwork.related().sales.add sale_type: 'auction promo'
        @artwork.isPartOfAuctionPromo().should.be.true()

    describe '#isContactable', ->
      it 'can be contacted given the correct flags', ->
        @artwork.set forsale: true, partner: 'existy', acquireable: false
        @artwork.isContactable().should.be.true()
        @artwork.set forsale: true, partner: 'existy', acquireable: true
        @artwork.isContactable().should.be.false()
        @artwork.set forsale: false, partner: 'existy', acquireable: false
        @artwork.isContactable().should.be.false()
        @artwork.set forsale: true, partner: undefined, acquireable: false
        @artwork.isContactable().should.be.false()

      describe 'with auction promo', ->
        beforeEach ->
          @artwork.related().sales.reset()

        it 'is contactable given an auction promo in the preview state', ->
          @artwork.set forsale: true, partner: 'existy', acquireable: true
          # Despite being normally uncontactable
          @artwork.isContactable().should.be.false()
          # Becomes contactable in the presence of a previeable promo
          @artwork.related().sales.add sale_type: 'auction promo', auction_state: 'preview'
          @artwork.isContactable().should.be.true()

      describe 'with an auction', ->
        beforeEach ->
          @artwork.related().sales.reset()

        it 'is not contactable at all', ->
          @artwork.set forsale: true, partner: 'existy', acquireable: false
          # Contactable at first
          @artwork.isContactable().should.be.true()
          # Auction enters
          @artwork.related().sales.add is_auction: true
          # No longer contactable
          @artwork.isContactable().should.be.false()

    it 'might be unavailable... but inquireable', ->
      @artwork.set { forsale: false, inquireable: true, sold: false }
      @artwork.isUnavailableButInquireable().should.be.true()
      @artwork.set { forsale: true, inquireable: true, sold: false }
      @artwork.isUnavailableButInquireable().should.be.false()
      @artwork.set { forsale: false, inquireable: true, sold: true }
      @artwork.isUnavailableButInquireable().should.be.false()

  describe '#hasDimension', ->
    it 'returns true on any attribute vaguely numeric', ->
      @artwork.set { width: 1 }
      @artwork.hasDimension('width').should.be.true()
      @artwork.set { width: 'nope' }
      @artwork.hasDimension('width').should.be.false()
      @artwork.set { width: '1 nope' }
      @artwork.hasDimension('width').should.be.true()
      @artwork.set { width: '1 1/2 in' }
      @artwork.hasDimension('width').should.be.true()
      @artwork.unset 'width'
      @artwork.hasDimension('width').should.be.false()

  describe '#hasMoreInfo', ->
    it 'has more info', ->
      @artwork.set { provenance: undefined, exhibition_history: '', signature: '', additional_information: undefined, literature: undefined }
      @artwork.hasMoreInfo().should.be.false()
      @artwork.set 'literature', 'existy'
      @artwork.hasMoreInfo().should.be.true()

    it 'has more info when there is a blurb', ->
      @artwork.clear()
      @artwork.hasMoreInfo().should.be.false()
      @artwork.set 'blurb', 'existy'
      @artwork.hasMoreInfo().should.be.true()

  describe '#contactLabel', ->
    it 'says to contact the appropriate thing', ->
      @artwork.set 'partner', { type: 'Gallery' }
      @artwork.contactLabel().should.equal 'gallery'
      @artwork.set 'partner', { type: 'Institution' }
      @artwork.contactLabel().should.equal 'seller'
      @artwork.unset 'partner'
      @artwork.contactLabel().should.equal 'seller'

  describe '#priceDisplay', ->
    it 'displays the price or not', ->
      @artwork.set { availability: 'for sale', price_hidden: false, price: '$_$' }
      @artwork.priceDisplay().should.equal '$_$'
      @artwork.set { availability: 'for sale', price_hidden: false, price: undefined, sale_message: 'Contact For Price' }
      @artwork.priceDisplay().should.equal 'Contact For Price'
      @artwork.set { availability: 'for sale', price_hidden: true, price: '$_$' }
      @artwork.priceDisplay().should.equal 'Contact For Price'

  describe '#editionStatus', ->
    it 'displays what kind of edition it is otherwise is undefined', ->
      @artwork.set { unique: true }
      @artwork.editions = new Backbone.Collection
      @artwork.editionStatus().should.equal 'Unique'
      @artwork.set { unique: false }
      _.isUndefined(@artwork.editionStatus()).should.be.true()
      @artwork.editions.add { editions: '1 of 5' }
      @artwork.editionStatus().should.equal '1 of 5'

  describe '#defaultImageUrl', ->
    it 'returns the first medium image url by default', ->
      @artwork.defaultImageUrl().should.match(
        /// /local/additional_images/.*/medium.jpg ///
      )

    # Have to unset the images attribute as well as resetting the collection
    # due to #defaultImage falling back to wrapping the first element
    # of the images attribute
    it 'works if there are no images', ->
      @artwork.unset('images')
      @artwork.related().images.reset()
      @artwork.defaultImageUrl().should.equal @artwork.defaultImage().missingImageUrl()

  describe '#defaultImage', ->
    it 'works if artwork.images is null but has images', ->
      @artwork.images = null
      @artwork.defaultImage().get('id').should.equal @artwork.get('images')[1].id

  describe '#titleAndYear', ->
    it 'returns empty string without title or year', ->
      @artwork.set title: false, date: false
      @artwork.titleAndYear().should.equal ''

    it 'renderes correctly with just a date', ->
      @artwork.set title: false, date: '1905'
      @artwork.titleAndYear().should.equal '1905'

    it 'emphasises the title', ->
      @artwork.set title: 'title', date: '1905'
      @artwork.titleAndYear().should.equal '<em>title</em>, 1905'

  describe '#partnerName', ->
    it "partner name", ->
      @artwork.set partner: fabricate 'partner'
      @artwork.unset 'collecting_institution'
      @artwork.partnerName().should.equal 'Gagosian Gallery'

    it "partner name with collecting institution", ->
      @artwork.set partner: fabricate 'partner'
      @artwork.partnerName().should.equal 'MOMA'

  describe '#partnerLink', ->
    it "empty without partner", ->
      @artwork.unset 'partner'
      should.strictEqual(undefined, @artwork.partnerLink())

    it "partner profile", ->
      @artwork.get('partner').default_profile_public = true
      @artwork.get('partner').default_profile_id = 'profile-id'
      @artwork.partnerLink().should.equal '/profile-id'

    it "doesn't render an external website", ->
      @artwork.get('partner').default_profile_public = false
      @artwork.get('partner').default_profile_id = 'profile-id'
      @artwork.get('partner').website = 'mah-website.com'
      should.strictEqual(undefined, @artwork.partnerLink())

    it "partner website if profile and profile is private", ->
      @artwork.get('partner').type = 'Auction'
      should.strictEqual(undefined, @artwork.partnerLink())

  describe '#href', ->
    it 'creates an href for linking to this artwork', ->
      @artwork.href().should.equal "/artwork/#{@artwork.get('id')}"

  describe '#toAltText', ->
    it "Includes title, date and artist name", ->
      @artwork.toAltText().should.equal "Andy Warhol, 'Skull,' 1999, Gagosian Gallery"

    it "Works without title, date, partner, and artist name", ->
      @artwork.set
        artist: undefined
        date: undefined
        title: undefined
        partner: undefined
      @artwork.toAltText().should.equal ""

  describe "artistName", ->
    it "renders correctly", ->
      new Artwork(title: "title", forsale: false).artistName().should.equal ""
      new Artwork(title: "title", forsale: false, artist: { name: undefined }).artistName().should.equal ""
      new Artwork(title: "title", forsale: false, artists: [{ name: undefined }]).artistName().should.equal ""
      new Artwork(title: "title", forsale: false, artist: { name: "popeye the sailor" }).artistName().should.equal "popeye the sailor"
      new Artwork(title: "title", forsale: false, artists: [{ name: "cap'n crunch" }]).artistName().should.equal "cap'n crunch"
      new Artwork(title: "title", forsale: false, artists: [{ name: "cap'n crunch" }, { name: "popeye the sailor" }]).artistName().should.equal "cap'n crunch"
      new Artwork(title: "title", forsale: false, artists: [{ name: undefined }, { name: "so and so" }]).artistName().should.equal "so and so"
      new Artwork(title: "title", forsale: false, artist: { name: undefined }, artists: [{ name: "so and so" }]).artistName().should.equal "so and so"

  describe "artistsNames", ->
    it "renders correctly", ->
      new Artwork(title: "title", forsale: false).artistsNames().should.equal ""
      new Artwork(title: "title", forsale: false, artist: { name: "john doe" }).artistsNames().should.equal "john doe"
      new Artwork(title: "title", forsale: false, artists: [{ name: "john doe" }, { name: "mark twain" }]).artistsNames().should.equal "john doe and mark twain"
      new Artwork(title: "title", forsale: false, artists: [{ name: undefined }, { name: "mark twain" }]).artistsNames().should.equal "mark twain"
      new Artwork(title: "title", forsale: false, artists: [{ name: "john doe" }, { name: "mark twain" }, { name: "joey pepperoni" }]).artistsNames().should.equal "john doe, mark twain and joey pepperoni"
      new Artwork(title: "title", forsale: false, artists: [{ name: undefined }, { name: "mark twain" }, { name: "joey pepperoni" }]).artistsNames().should.equal "mark twain and joey pepperoni"

  describe "#toPageTitle", ->
    it "renders correctly", ->
      new Artwork(title: "", forsale: false).toPageTitle().should.equal "Artsy"
      new Artwork(title: "title", forsale: false).toPageTitle().should.equal "title | Artsy"
      new Artwork(title: "title", forsale: true).toPageTitle().should.equal "title, Available for Sale | Artsy"
      new Artwork(title: "title", forsale: false, artist: { name: "john doe" }).toPageTitle().should.equal "john doe | title | Artsy"
      new Artwork(title: "title", forsale: false, artists: [{ name: "john doe" }, { name: "santa claus" }]).toPageTitle().should.equal "john doe and santa claus | title | Artsy"
      new Artwork(title: "title", forsale: false, artists: [{ name: "john doe" }, { name: "santa claus" }, { name: "hello kitty" }]).toPageTitle().should.equal "john doe, santa claus and hello kitty | title | Artsy"
      new Artwork(title: "", forsale: false, artist: { name: "last" }).toPageTitle().should.equal "last | Artsy"
      new Artwork(title: "title", forsale: false, date: "2010" ).toPageTitle().should.equal "title (2010) | Artsy"
      new Artwork(title: "title", forsale: false, date: "2010", artist: { name: "last" }).toPageTitle().should.equal "last | title (2010) | Artsy"
      new Artwork(title: "title", forsale: false, date: "2010-2011", artist: { name: "first last" }).toPageTitle().should.equal "first last | title (2010-2011) | Artsy"
      new Artwork(title: "title", forsale: false, date: "2010, 2011, 2012", artist: { name: "first last" }).toPageTitle().should.equal "first last | title (2010, 2011, 2012) | Artsy"

  describe "#toPageDescription", ->
    it "renders correctly", ->
      new Artwork(title: "title").toPageDescription().should.equal "title"
      new Artwork(title: "title", partner: { name: 'partner' }, forsale: false).toPageDescription().should.equal "From partner, title"
      new Artwork(title: "title", partner: { name: 'partner' }, forsale: true).toPageDescription().should.equal "Available for sale from partner, title"
      new Artwork(title: "title", dimensions: { in: "2 × 1 × 3 in" }, metric: 'in', forsale: false).toPageDescription().should.equal "title, 2 × 1 × 3 in"
      new Artwork(title: "title", dimensions: { in: "2 × 1 × 3 in" }, metric: 'in', medium: "Awesomeness", forsale: false).toPageDescription().should.equal "title, Awesomeness, 2 × 1 × 3 in"
      new Artwork(title: "title", dimensions: { cm: "45000000 × 2000000000 cm" }, metric: 'cm', forsale: false).toPageDescription().should.equal "title, 45000000 × 2000000000 cm"
      new Artwork(title: "title", dimensions: { cm: "45000000 × 2000000000 cm" }, metric: 'cm', medium: "Awesomeness", forsale: false).toPageDescription().should.equal "title, Awesomeness, 45000000 × 2000000000 cm"
      new Artwork(title: "title", dimensions: { cm: "20 cm diameter" }, metric: 'cm', forsale: false).toPageDescription().should.equal "title, 20 cm diameter"
      new Artwork(title: "title", dimensions: { cm: "20 cm diameter" }, metric: 'cm', medium: "Awesomeness", forsale: false).toPageDescription().should.equal "title, Awesomeness, 20 cm diameter"
      new Artwork(title: "title", dimensions: { cm: "20 cm diameter" }, metric: 'cm', medium: "Awesomeness", artist: { name: "first last" }, forsale: false).toPageDescription().should.equal "first last, title, Awesomeness, 20 cm diameter"

  describe '#toJSONLD', ->

    it 'returns valid json', ->
      json = @artwork.toJSONLD()
      json['@context'].should.equal 'http://schema.org'
      json['@type'].should.equal 'CreativeWork'
      json.name.should.equal 'Skull'
