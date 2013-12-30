sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
Artwork = require '../../models/artwork'
Partner = require '../../models/partner'
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
      new Artwork(fabricate 'artwork', title: "", forsale: false).toPageTitle().should.equal "Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false).toPageTitle().should.equal "title | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: true).toPageTitle().should.equal "title, Available for Sale | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false, artist: new Artist(fabricate 'artist', first: "first", last: "last")).toPageTitle().should.equal "first last | title | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false, artist: new Artist(fabricate 'artist', first: "first", middle: "middle", last: "last")).toPageTitle().should.equal "first middle last | title | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false, artist: new Artist(fabricate 'artist', first: "first")).toPageTitle().should.equal "first | title | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false, artist: new Artist(fabricate 'artist', last: "last")).toPageTitle().should.equal "last | title | Artsy"
      new Artwork(fabricate 'artwork', title: "", forsale: false, artist: new Artist(fabricate 'artist', last: "last")).toPageTitle().should.equal "last | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false, dates: [ 2010 ]).toPageTitle().should.equal "title (2010) | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false, dates: [ 2010 ], artist: new Artist(fabricate 'artist', first: "first", last: "last")).toPageTitle().should.equal "first last | title (2010) | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false, dates: [ 2010, 2011 ], artist: new Artist(fabricate 'artist', first: "first", last: "last")).toPageTitle().should.equal "first last | title (2010-2011) | Artsy"
      new Artwork(fabricate 'artwork', title: "title", forsale: false, dates: [ 2010, 2011, 2012 ], artist: new Artist(fabricate 'artist', first: "first", last: "last")).toPageTitle().should.equal "first last | title (2010, 2011, 2012) | Artsy"

  describe "#toAuctionResultsPageTitle", ->

    it "renders correctly", ->
      new Artwork(fabricate 'artwork', title: "").toAuctionResultsPageTitle().should.equal "Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title").toAuctionResultsPageTitle().should.equal "title | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title", artist: new Artist(fabricate 'artist', first: "first", last: "last")).toAuctionResultsPageTitle().should.equal "first last, title | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title", artist: new Artist(fabricate 'artist', first: "first", middle: "middle", last: "last")).toAuctionResultsPageTitle().should.equal "first middle last, title | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title", artist: new Artist(fabricate 'artist', first: "first")).toAuctionResultsPageTitle().should.equal "first, title | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title", artist: new Artist(fabricate 'artist', last: "last")).toAuctionResultsPageTitle().should.equal "last, title | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "", artist: new Artist(fabricate 'artist', last: "last")).toAuctionResultsPageTitle().should.equal "last | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title", dates: [ 2010 ]).toAuctionResultsPageTitle().should.equal "title (2010) | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title", dates: [ 2010 ], artist: new Artist(fabricate 'artist', first: "first", last: "last")).toAuctionResultsPageTitle().should.equal "first last, title (2010) | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title", dates: [ 2010, 2011 ], artist: new Artist(fabricate 'artist', first: "first", last: "last")).toAuctionResultsPageTitle().should.equal "first last, title (2010-2011) | Related Auction Results | Artsy"
      new Artwork(fabricate 'artwork', title: "title", dates: [ 2010, 2011, 2012 ], artist: new Artist(fabricate 'artist', first: "first", last: "last")).toAuctionResultsPageTitle().should.equal "first last, title (2010, 2011, 2012) | Related Auction Results | Artsy"

  describe "#toPageDescription", ->

    it "renders correctly", ->
      new Artwork(fabricate 'artwork', title: "title").toPageDescription().should.equal "title"
      new Artwork(fabricate 'artwork', title: "title", partner: new Partner(fabricate 'partner', given_name: 'partner'), forsale: false).toPageDescription().should.equal "From partner, title"
      new Artwork(fabricate 'artwork', title: "title", partner: new Partner(fabricate 'partner', given_name: 'partner'), forsale: true).toPageDescription().should.equal "Available for sale from partner, title"
      new Artwork(fabricate 'artwork', title: "title", width: 1, height: 2, depth: 3, forsale: false).toPageDescription().should.equal "title, 2 × 1 × 3 in"
      new Artwork(fabricate 'artwork', title: "title", dimensions: { in: "2 × 1 × 3" }, medium: "Awesomeness", forsale: false).toPageDescription().should.equal "title, Awesomeness, 2 × 1 × 3 in"
      new Artwork(fabricate 'artwork', title: "title", dimensions: { cm: "45000000 × 2000000000" }, forsale: false).toPageDescription().should.equal "title, 45000000 × 2000000000 cm"
      new Artwork(fabricate 'artwork', title: "title", dimensions: { cm: "45000000 × 2000000000" }, medium: "Awesomeness", forsale: false).toPageDescription().should.equal "title, Awesomeness, 45000000 × 2000000000 cm"
      new Artwork(fabricate 'artwork', title: "title", diameter: 20, metric: Metric::CM, forsale: false).toPageDescription().should.equal "title, 20 cm diameter"
      new Artwork(fabricate 'artwork', title: "title", diameter: 20, metric: Metric::CM, medium: "Awesomeness", forsale: false).toPageDescription().should.equal "title, Awesomeness, 20 cm diameter"
      new Artwork(fabricate 'artwork', title: "title", diameter: 20, metric: Metric::CM, medium: "Awesomeness", artist: new Artist(fabricate 'artist', first: "first", last: "last"), forsale: false).toPageDescription().should.equal "first last, title, Awesomeness, 20 cm diameter"

  describe "toAuctionResultsPageDescription", ->

    it "renders correctly", ->
      new Artwork(fabricate 'artwork', title: "title").toAuctionResultsPageDescription().should.equal "Related auction results for title"
      new Artwork(fabricate 'artwork', title: "title", dimensions: { in: "2 × 1 × 3" } ).toAuctionResultsPageDescription().should.equal "Related auction results for title, 2 × 1 × 3 in"
      new Artwork(fabricate 'artwork', title: "title", dimensions: { in: "2 × 1 × 3" }, medium: "Awesomeness").toAuctionResultsPageDescription().should.equal "Related auction results for title, Awesomeness, 2 × 1 × 3 in"
      new Artwork(fabricate 'artwork', title: "title", dimensions: { cm: "45000000 × 2000000000" }).toAuctionResultsPageDescription().should.equal "Related auction results for title, 45000000 × 2000000000 cm"
      new Artwork(fabricate 'artwork', title: "title", dimensions: { cm: "45000000 × 2000000000" }, medium: "Awesomeness").toAuctionResultsPageDescription().should.equal "Related auction results for title, Awesomeness, 45000000 × 2000000000 cm"
      new Artwork(fabricate 'artwork', title: "title", diameter: 20, metric: Metric::CM).toAuctionResultsPageDescription().should.equal "Related auction results for title, 20 cm diameter"
      new Artwork(fabricate 'artwork', title: "title", diameter: 20, metric: Metric::CM, medium: "Awesomeness").toAuctionResultsPageDescription().should.equal "Related auction results for title, Awesomeness, 20 cm diameter"
      new Artwork(fabricate 'artwork', title: "title", diameter: 20, metric: Metric::CM, medium: "Awesomeness", artist: new Artist(fabricate 'artist', first: "first", last: "last")).toAuctionResultsPageDescription().should.equal "Related auction results for first last, title, Awesomeness, 20 cm diameter"
