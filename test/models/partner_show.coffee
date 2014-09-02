_ = require 'underscore'
{ fabricate } = require 'antigravity'
sd = require('sharify').data
should = require 'should'
Backbone = require 'backbone'
PartnerShow = require '../../models/partner_show'
PartnerLocation = require '../../models/partner_location'
FairLocation = require '../../models/partner_location'
sinon = require 'sinon'

describe 'PartnerShow', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @partnerShow = new PartnerShow fabricate('show')

  afterEach ->
    Backbone.sync.restore()

  describe '#url', ->

    it 'includes a partner in the url if the model has one', ->
      partnerShow = new PartnerShow id: 'slug-for-show', partner: fabricate('partner')
      partnerShow.url().should.equal "#{sd.API_URL}/api/v1/partner/#{partnerShow.get('partner').id}/show/#{partnerShow.get('id')}"

    it 'returns a URL with no id for new models', ->
      partnerShow = new PartnerShow id: 'slug-for-show'
      partnerShow.url().should.equal "#{sd.API_URL}/api/v1/show/#{partnerShow.get('id')}"

  describe '#toJSONLD', ->

    it 'returns valid json', ->
      artist = fabricate 'artist'
      @partnerShow.set artists: [artist]
      json = @partnerShow.toJSONLD()
      json['@context'].should.equal 'http://schema.org'
      json['@type'].should.equal 'Event'
      json.name.should.equal 'Inez & Vinoodh'
      json.location.name.should.equal 'Gagosian Gallery'
      json.location.address.should.eql
        '@type': 'PostalAddress'
        streetAddress: '529 W 20th St.2nd Floor'
        addressLocality: 'New York'
        addressRegion: 'NY'
        postalCode: '10011'
      json.performer[0].should.eql {
        "@type": "Person"
        image: "/images/missing_image.png"
        name: "Pablo Picasso"
        sameAs: "undefined/artist/#{artist.id}"
      }

  describe '#toPageTitle', ->

    it 'creates a title defensively handling empty or missing values', ->
      @partnerShow.toPageTitle().should.containEql "Inez & Vinoodh | Gagosian Gallery |"

    it 'omits the artworks for sale bit if the partner is not a gallery', ->
      @partnerShow.attributes.partner.name = "White Cube"
      @partnerShow.attributes.partner.type = "Museum"
      @partnerShow.toPageTitle().should.not.containEql ", Artwork for Sale"

  describe '#toPageDescription', ->

    it 'correctly renders the meta description', ->
      @partnerShow.toPageDescription().should.containEql 'Past show at Gagosian Gallery New York, 529 W 20th St. 2nd Floor'

    it 'adds a single artist to the meta description', ->
      @partnerShow.set 'artists', [fabricate('artist')]
      @partnerShow.toPageDescription().should.containEql 'Past show featuring works by Pablo Picasso at Gagosian Gallery New York, 529 W 20th St. 2nd Floor'

    it 'adds multiple artists to the meta description', ->
      @partnerShow.set 'artists', [fabricate('artist'), fabricate('artist')]
      @partnerShow.toPageDescription().should.containEql 'Past show featuring works by Pablo Picasso and Pablo Picasso at Gagosian Gallery New York, 529 W 20th St. 2nd Floor'

  describe '#location', ->

    it 'returns a partner location', ->
      show = new PartnerShow fabricate 'show'
      show.location().should.be.instanceOf(PartnerLocation)

    it 'returns a fair location', ->
      show = new PartnerShow(fabricate 'show',
        fair_location:
          display: 'Booth 1234'
      )
      show.location().should.be.instanceOf(FairLocation)

  describe '#runningDates', ->

    it 'gives a formatted date span for the running dates', ->
      @partnerShow.runningDates().should.equal "Jul. 12th – Aug. 23rd 2013"

  describe '#shareTitle', ->

    it "includes fair location", ->
      @partnerShow.set
        fair_location:
          display: 'Booth 1234'

      @partnerShow.shareTitle().should.equal "Inez & Vinoodh, Booth 1234 See it on @artsy"

    it "include partner name", ->
      @partnerShow.shareTitle().should.equal 'See "Inez & Vinoodh" at Gagosian Gallery on @artsy'

  describe '#formatArtists', ->

    beforeEach ->
      @partnerShow.set
        artists: [
          fabricate('artist', id: 'picasso-1')
          fabricate('artist', id: 'picasso-2')
          fabricate('artist', id: 'picasso-3')
          fabricate('artist', id: 'picasso-4')
        ]

    it "correctly limits artists", ->
      @partnerShow.formatArtists(2).should.equal "<a href='/artist/picasso-1'>Pablo Picasso</a>, <a href='/artist/picasso-2'>Pablo Picasso</a> and 2 more"

    it "correctly limits artists", ->
      @partnerShow.formatArtists().should.equal "<a href='/artist/picasso-1'>Pablo Picasso</a>, <a href='/artist/picasso-2'>Pablo Picasso</a>, <a href='/artist/picasso-3'>Pablo Picasso</a>, <a href='/artist/picasso-4'>Pablo Picasso</a>"

  describe '#fairLocationDisplay', ->

    it "Returns fair location", ->
      @partnerShow.set
        fair_location:
          display: 'Booth 1234'

      @partnerShow.fairLocationDisplay().should.equal "<i>New York</i> &ndash; Booth 1234"

  describe '#posterImageUrl', ->
    it 'returns an image', ->
      @partnerShow.posterImageUrl().should.containEql 'partner_show_images/51f6a51d275b24a787000c36/1/large.jpg'

    it 'returns a featured image', ->
      @partnerShow.posterImageUrl(true).should.containEql '/partner_show_images/51f6a51d275b24a787000c36/1/featured.jpg'

    it 'returns larger if featured or large is unavailable', (done) ->
      @partnerShow.on 'fetch:posterImageUrl', (url) ->
        url.should.containEql 'additional_images/4e7cb83e1c80dd00010038e2/1/large.jpg'
        done()

      @partnerShow.unset 'image_versions'
      @partnerShow.posterImageUrl()
      Backbone.sync.args[0][2].url.should.containEql "/api/v1/partner/#{@partnerShow.get('partner').id}/show/#{@partnerShow.id}/artworks"
      Backbone.sync.args[0][2].success [fabricate 'artwork']

    it 'returns empty when there really is no image', ->
      @partnerShow.unset 'image_versions'
      @partnerShow.posterImageUrl()
      Backbone.sync.args[0][2].success []
