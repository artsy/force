_               = require 'underscore'
sinon           = require 'sinon'
should          = require 'should'
Backbone        = require 'backbone'
Artwork         = require '../../models/artwork'
{ fabricate }   = require 'antigravity'

describe 'Artwork', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate('artwork'), parse: true

  afterEach ->
    Backbone.sync.restore()

  describe '#setDefaultImage', ->
    it 'sets the default image position to 0', ->
      defaultImage = @artwork.defaultImage()
      defaultImage.set 'position', 2
      @artwork.setDefaultImage()
      defaultImage.get('position').should.equal 0

    it 'sorts the images and have the default image at the beginning', ->
      defaultImage = @artwork.defaultImage()
      defaultImage.set 'position', 2
      @artwork.images.unshift { position: 3 }
      @artwork.images.first().get('position').should.equal 3
      @artwork.setDefaultImage()
      @artwork.images.first().should.equal defaultImage

  describe '#hasAdditionalImages', ->
    it 'indicates if there is more than one image', ->
      @artwork.hasAdditionalImages().should.be.ok
      @artwork.images.reset()
      @artwork.hasAdditionalImages().should.not.be.ok

  describe '#saleMessage', ->
    it 'formats sold sale message', ->
      @artwork.save
        sale_message: '$6,000 - Sold'
        price: '$6,000'
      @artwork.saleMessage().should.equal "<span style='letter-spacing: 1px;'>SOLD</span> &ndash; $6,000"
      @artwork.save
        sale_message: '$6,000'
      @artwork.saleMessage().should.equal '$6,000'

  describe '#additionalImages', ->
    it 'returns an array of image objects sans the defaultImage', ->
      defaultImage      = @artwork.defaultImage()
      additionalImages  = @artwork.additionalImages()
      additionalImages.length.should.be.ok
      _.contains(_.pluck(additionalImages, 'id'), defaultImage.id).should.not.be.ok

  describe '#setActiveImage, #activeImage', ->
    it 'sets the active image and returns it', ->
      notDefaultImageId = @artwork.images.last().id
      @artwork.activeImage().id.should.equal @artwork.defaultImage().id
      @artwork.activeImage().id.should.not.equal notDefaultImageId
      @artwork.setActiveImage(notDefaultImageId)
      @artwork.activeImage().id.should.equal notDefaultImageId

  describe 'display conditions:', ->
    it 'can be downloadable', ->
      @artwork.defaultImage().set 'downloadable', false
      @artwork.isDownloadable().should.not.be.ok
      @artwork.defaultImage().set 'downloadable', true
      @artwork.isDownloadable().should.be.ok

    it 'can be compared', ->
      @artwork.set 'comparables_count', 1
      @artwork.isComparable()
      @artwork.isComparable().should.be.ok
      @artwork.set 'comparables_count', 0
      @artwork.isComparable().should.not.be.ok
      @artwork.set { comparables_count: 1, category: 'Architecture' }
      @artwork.isComparable().should.not.be.ok

    it 'can have a price displayed', ->
      sinon.stub(@artwork, 'isMultipleEditions').returns false
      sinon.stub(@artwork, 'isUnavailableButInquireable').returns false
      @artwork.set { price: 'existy', inquireable: true }
      @artwork.isPriceDisplayable().should.be.ok
      @artwork.set { inquireable: false, sold: true }
      @artwork.isPriceDisplayable().should.be.ok
      @artwork.set { inquireable: false, sold: false }
      @artwork.isPriceDisplayable().should.not.be.ok
      @artwork.set { inquireable: true, price: undefined }
      @artwork.isPriceDisplayable().should.not.be.ok
      @artwork.set { inquireable: true, price: 'existy' }
      @artwork.isPriceDisplayable().should.be.ok
      @artwork.isMultipleEditions.restore()
      @artwork.isUnavailableButInquireable.restore()

    it 'can have multiple editions', ->
      @artwork.set 'edition_sets', undefined
      @artwork.isMultipleEditions().should.not.be.ok
      @artwork.set 'edition_sets', [0]
      @artwork.isMultipleEditions().should.not.be.ok
      @artwork.set 'edition_sets', [0, 0]
      @artwork.isMultipleEditions().should.be.ok

    it 'can be hung', ->
      @artwork.set { depth: undefined, height: 1, width: '1' }
      @artwork.set 'category', 'Design'
      @artwork.isHangable().should.not.be.ok
      @artwork.set 'category', 'Painting'
      @artwork.isHangable().should.be.ok
      @artwork.set 'depth', 1
      @artwork.isHangable().should.not.be.ok

    it 'can be contacted', ->
      @artwork.set { forsale: true, partner: 'existy', acquireable: false }
      @artwork.isContactable().should.be.ok
      @artwork.set { forsale: true, partner: 'existy', acquireable: true }
      @artwork.isContactable().should.not.be.ok
      @artwork.set { forsale: false, partner: 'existy', acquireable: false }
      @artwork.isContactable().should.not.be.ok
      @artwork.set { forsale: true, partner: undefined, acquireable: false }
      @artwork.isContactable().should.not.be.ok

    it 'might be unavailable... but inquireable', ->
      @artwork.set { forsale: false, inquireable: true, sold: false }
      @artwork.isUnavailableButInquireable().should.be.ok
      @artwork.set { forsale: true, inquireable: true, sold: false }
      @artwork.isUnavailableButInquireable().should.not.be.ok
      @artwork.set { forsale: false, inquireable: true, sold: true }
      @artwork.isUnavailableButInquireable().should.not.be.ok

  describe '#hasDimension', ->
    it 'returns true on any attribute vaguely numeric', ->
      @artwork.set { width: 1 }
      @artwork.hasDimension('width').should.be.ok
      @artwork.set { width: 'nope' }
      @artwork.hasDimension('width').should.not.be.ok
      @artwork.set { width: '1 nope' }
      @artwork.hasDimension('width').should.be.ok
      @artwork.set { width: '1 1/2 in' }
      @artwork.hasDimension('width').should.be.ok
      @artwork.unset 'width'
      @artwork.hasDimension('width').should.not.be.ok

  describe '#hasMoreInfo', ->
    it 'has more info', ->
      @artwork.set { provenance: undefined, exhibition_history: '', signature: '', additional_information: undefined, literature: undefined }
      @artwork.hasMoreInfo().should.not.be.ok
      @artwork.set 'literature', 'existy'
      @artwork.hasMoreInfo().should.be.ok

  describe '#contactLabel', ->
    it 'says to contact the appropriate thing', ->
      @artwork.set 'partner', { type: 'Gallery' }
      @artwork.contactLabel().should.equal 'Contact Gallery'
      @artwork.set 'partner', { type: 'Institution' }
      @artwork.contactLabel().should.equal 'Contact Seller'
      @artwork.unset 'partner'
      @artwork.contactLabel().should.equal 'Contact Seller'

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
      _.isUndefined(@artwork.editionStatus()).should.be.ok
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
      @artwork.images.reset()
      @artwork.defaultImageUrl().should.equal @artwork.missingImageUrl()

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

  describe '#href', ->
    it 'creates an href for linking to this artwork', ->
      @artwork.href().should.equal "/artwork/#{@artwork.get('id')}"

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
