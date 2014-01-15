_             = require 'underscore'
{ fabricate } = require 'antigravity'
sd            = require('sharify').data
should        = require 'should'
Backbone      = require 'backbone'
PartnerShow   = require '../../models/partner_show'

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

    xit 'returns a partner or fair location', ->

  describe '#runningDates', ->

    it 'gives a formatted date span for the running dates', ->
      @partnerShow.runningDates().should.equal "Jul. 12th &#x2013; Aug. 23rd 2013"
