sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
Artwork = require '../../models/artwork'
{ fabricate } = require 'antigravity'

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
      @artwork.defaultImageUrl().should.equal ''

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

    it "collecting institution over partner name", ->
      @artwork.set partner: fabricate 'partner'
      @artwork.set collecting_institution: 'collecting'
      @artwork.partnerName().should.equal 'collecting'

    it "nothing without partner name or collecting institution", ->
      @artwork.unset 'partner'
      @artwork.unset 'collecting_institution'
      @artwork.partnerName().should.equal ''

    it "partner name", ->
      @artwork.set partner: fabricate 'partner'
      @artwork.unset 'collecting_institution'
      @artwork.partnerName().should.equal 'Gagosian Gallery'

  describe '#partnerLink', ->

    it "empty without partner", ->
      @artwork.unset 'partner'
      should.strictEqual(undefined, @artwork.partnerLink())

    it "partner profile", ->
      @artwork.get('partner').default_profile_public = true
      @artwork.get('partner').default_profile_id = 'profile-id'
      @artwork.partnerLink().should.equal '/profile-id'

    it "partner website if profile and profile is private", ->
      @artwork.get('partner').default_profile_public = false
      @artwork.get('partner').default_profile_id = 'profile-id'
      @artwork.get('partner').website = 'mah-website.com'
      @artwork.partnerLink().should.equal 'mah-website.com'

  describe '#toAltText', ->

    it "Includes title, date and artist name", ->
      @artwork.toAltText().should.equal "Skull, 1999, by Andy Warhol"

    it "Works without title, date and artist name", ->
      @artwork.set
        artist: undefined
        date: undefined
        title: undefined
      @artwork.toAltText().should.equal ""

  describe "#toPageTitle", ->

    it "renders correctly", ->
      new Artwork(title: "", forsale: false).toPageTitle().should.equal "Artsy"
      new Artwork(title: "title", forsale: false).toPageTitle().should.equal "title | Artsy"
      new Artwork(title: "title", forsale: true).toPageTitle().should.equal "title, Available for Sale | Artsy"
      new Artwork(title: "title", forsale: false, artist: { name: "first last" }).toPageTitle().should.equal "first last | title | Artsy"
      new Artwork(title: "title", forsale: false, artist: { name: "first middle last" }).toPageTitle().should.equal "first middle last | title | Artsy"
      new Artwork(title: "", forsale: false, artist: { name: "last" }).toPageTitle().should.equal "last | Artsy"
      new Artwork(title: "title", forsale: false, date: "2010" ).toPageTitle().should.equal "title (2010) | Artsy"
      new Artwork(title: "title", forsale: false, date: "2010", artist: { name: "last" }).toPageTitle().should.equal "last | title (2010) | Artsy"
      new Artwork(title: "title", forsale: false, date: "2010-2011", artist: { name: "first last" }).toPageTitle().should.equal "first last | title (2010-2011) | Artsy"
      new Artwork(title: "title", forsale: false, date: "2010, 2011, 2012", artist: { name: "first last" }).toPageTitle().should.equal "first last | title (2010, 2011, 2012) | Artsy"

  describe "#toAuctionResultsPageTitle", ->

    it "renders correctly", ->
      new Artwork(title: "").toAuctionResultsPageTitle().should.equal "Related Auction Results | Artsy"
      new Artwork(title: "title").toAuctionResultsPageTitle().should.equal "title | Related Auction Results | Artsy"
      new Artwork(title: "title", artist: { name: "first last" }).toAuctionResultsPageTitle().should.equal "first last, title | Related Auction Results | Artsy"
      new Artwork(title: "title", artist: { name: "first middle last" }).toAuctionResultsPageTitle().should.equal "first middle last, title | Related Auction Results | Artsy"
      new Artwork(title: "title", artist: { name: "first" }).toAuctionResultsPageTitle().should.equal "first, title | Related Auction Results | Artsy"
      new Artwork(title: "title", artist: { name: "last" }).toAuctionResultsPageTitle().should.equal "last, title | Related Auction Results | Artsy"
      new Artwork(title: "", artist: { name: "last" }).toAuctionResultsPageTitle().should.equal "last | Related Auction Results | Artsy"
      new Artwork(title: "title", date: "2010").toAuctionResultsPageTitle().should.equal "title (2010) | Related Auction Results | Artsy"
      new Artwork(title: "title", date: "2010", artist: { name: "first last" }).toAuctionResultsPageTitle().should.equal "first last, title (2010) | Related Auction Results | Artsy"
      new Artwork(title: "title", date: "2010-2011", artist: { name: "first last" }).toAuctionResultsPageTitle().should.equal "first last, title (2010-2011) | Related Auction Results | Artsy"
      new Artwork(title: "title", date: "2010, 2011, 2012", artist: { name: "first last" }).toAuctionResultsPageTitle().should.equal "first last, title (2010, 2011, 2012) | Related Auction Results | Artsy"

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

  describe "toAuctionResultsPageDescription", ->

    it "renders correctly", ->
      new Artwork(title: "title").toAuctionResultsPageDescription().should.equal "Related auction results for title"
      new Artwork(title: "title", dimensions: { in: "2 × 1 × 3 in" }, metric: 'in').toAuctionResultsPageDescription().should.equal "Related auction results for title, 2 × 1 × 3 in"
      new Artwork(title: "title", dimensions: { in: "2 × 1 × 3 in" }, metric: 'in', medium: "Awesomeness").toAuctionResultsPageDescription().should.equal "Related auction results for title, Awesomeness, 2 × 1 × 3 in"
      new Artwork(title: "title", dimensions: { cm: "45000000 × 2000000000 cm" }, metric: 'cm').toAuctionResultsPageDescription().should.equal "Related auction results for title, 45000000 × 2000000000 cm"
      new Artwork(title: "title", dimensions: { cm: "45000000 × 2000000000 cm" }, metric: 'cm', medium: "Awesomeness").toAuctionResultsPageDescription().should.equal "Related auction results for title, Awesomeness, 45000000 × 2000000000 cm"
      new Artwork(title: "title", dimensions: { cm: "20 cm diameter" }, metric: 'cm').toAuctionResultsPageDescription().should.equal "Related auction results for title, 20 cm diameter"
      new Artwork(title: "title", dimensions: { cm: "20 cm diameter" }, metric: 'cm', medium: "Awesomeness").toAuctionResultsPageDescription().should.equal "Related auction results for title, Awesomeness, 20 cm diameter"
      new Artwork(title: "title", dimensions: { cm: "20 cm diameter" }, metric: 'cm', medium: "Awesomeness", artist: { name: "first last" }).toAuctionResultsPageDescription().should.equal "Related auction results for first last, title, Awesomeness, 20 cm diameter"
