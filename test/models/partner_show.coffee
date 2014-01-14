_             = require 'underscore'
{ fabricate } = require 'antigravity'
sd            = require('sharify').data
should        = require 'should'
Backbone      = require 'backbone'
PartnerShow   = require '../../models/partner_show'

describe 'PartnerShow', ->

  beforeEach ->
    @partnerShow = new PartnerShow(
      id: 'gagosian-gallery-inez-and-vinoodh'
      fair: null
      location:
        id: '51df5e068b3b815b62000012'
        name: 'Location 4'
        address: '456 North Camden Drive'
        address_2: ''
        city: 'Beverly Hills'
        country: 'United States'
        state: 'CA'
        postal_code: '90201'
        phone: '1 (310) 271-9400'
        coordinates: null
        position: 4
        email: ''
        fax: ''
        publicly_viewable: true
      fair_location: null
      partner:
        id: 'gagosian-gallery'
        default_profile_id: 'gagosian-gallery'
        default_profile_public: true
        sortable_id: 'gagosian-gallery'
        type: 'Gallery'
        name: 'Gagosian Gallery'
        website: 'http://www.gagosian.com'
        has_full_profile: true
      name: 'Inez & Vinoodh'
      image_url: '/local/partner_show_images/51f6a51d275b24a787000c36/1/:version.jpg'
      image_versions: [ 'medium', 'tall', 'large', 'larger', 'featured', 'general' ]
      description: ''
      press_release: ''
      created_at: '2013-07-17T21:27:50Z'
      publish_at: '2013-09-05T21:14:23Z'
      featured: false
      start_at: '2013-07-12T04:00:00+00:00'
      end_at: '2013-08-23T04:00:00+00:00'
      eligible_artworks_count: 6
      displayable: true
      images_count: 0
      status: 'closed'
      updated_at: '2013-09-26T15:03:29Z'
      coordinates: null
    )

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
