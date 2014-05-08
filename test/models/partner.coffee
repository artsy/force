_             = require 'underscore'
{ fabricate } = require 'antigravity'
sd            = require('sharify').data
should        = require 'should'
Backbone      = require 'backbone'
Partner       = require '../../models/partner'

describe 'Partner', ->

  before ->
    @sd =
      API_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @partner = new Partner(fabricate('partner',
      type: "Gallery"
      sortable_id: "gagosian-gallery"
      default_profile_id: "gagosian"
      locations: new Backbone.Collection([fabricate('location')])
    ))

  describe '#locations', ->

    it 'creates an empty collection that can fetch the locations if none exist', ->
      p = new Partner()
      locations = p.locations()
      locations.length.should.equal 0
      locations.url.should.equal "#{p.url()}/locations"
      locations.should.have.property 'models'

    it 'returns a location collection if it exists', ->
      locations = @partner.locations()
      locations.length.should.equal 1
      locations.first().attributes.should.have.property 'city'

  describe '#alphaSortKey', ->

    it "returns the partner model's sortable_id", ->
      @partner.alphaSortKey().should.equal @partner.get('sortable_id')

  describe '#href', ->

    it "returns the client link to this partner profile slug", ->
      @partner.href().should.equal "/#{@partner.get('default_profile_id')}"

  describe '#displayName', ->

    it "returns the partner's name", ->
      @partner.displayName().should.equal @partner.get('name')

  describe '#displayLocations', ->

    it "returns a string representing the partner's locations", ->
      @partner.displayLocations().should.equal 'New York'

    it 'handles 2 locations', ->
      @partner.get('locations').add fabricate 'location'
      @partner.displayLocations().should.equal 'New York + 1 other location'

    it 'handles n locations', ->
      @partner.get('locations').add fabricate 'location'
      @partner.get('locations').add fabricate 'location', city: 'Paris'
      @partner.displayLocations().should.equal 'New York + 3 other locations'

    it 'displays a preferred location if passed in', ->
      @partner.displayLocations('Paris').should.equal 'Paris + 3 other locations'
