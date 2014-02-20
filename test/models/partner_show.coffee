_             = require 'underscore'
{ fabricate } = require 'antigravity'
sd            = require('sharify').data
should        = require 'should'
Backbone      = require 'backbone'
PartnerShow   = require '../../models/partner_show'
PartnerLocation = require '../../models/partner_location'
FairLocation    = require '../../models/partner_location'

describe 'PartnerShow', ->

  beforeEach ->
    @partnerShow = new PartnerShow fabricate('show')

  describe '#url', ->

    it 'includes a partner in the url if the model has one', ->
      partnerShow = new PartnerShow id: 'slug-for-show', partner: fabricate('partner')
      partnerShow.url().should.equal "#{sd.ARTSY_URL}/api/v1/partner/#{partnerShow.get('partner').id}/show/#{partnerShow.get('id')}"

    it 'returns a URL with no id for new models', ->
      partnerShow = new PartnerShow id: 'slug-for-show'
      partnerShow.url().should.equal "#{sd.ARTSY_URL}/api/v1/show/#{partnerShow.get('id')}"

  describe '#metaTitle', ->

    it 'creates a title defensively handling empty or missing values', ->
      @partnerShow.metaTitle().should.include "Inez & Vinoodh | Gagosian Gallery |"
      @partnerShow.metaTitle().should.include @partnerShow.location().singleLine()
      @partnerShow.metaTitle().should.include @partnerShow.runningDates()

    it 'omits the artworks for sale bit if the partner is not a gallery', ->
      @partnerShow.attributes.partner.name = "White Cube"
      @partnerShow.attributes.partner.type = "Museum"
      @partnerShow.metaTitle().should.not.include ", Artwork for Sale"

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
      @partnerShow.runningDates().should.equal "Jul. 12th &#x2013; Aug. 23rd 2013"

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
