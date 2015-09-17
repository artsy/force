{ fabricate } = require 'antigravity'
PartnerLocation = require '../../models/partner_location'
PartnerLocations = require '../../collections/partner_locations'

describe 'PartnerLocations', ->
  beforeEach ->
    @partnerLocations = new PartnerLocations []
    @partnerLocations.add fabricate 'location'

  it "returns a string representing the partner's locations", ->
    @partnerLocations.displayLocations().should.equal 'New York'

  it 'handles 2 locations', ->
    @partnerLocations.add fabricate 'location'
    @partnerLocations.displayLocations().should.equal 'New York + 1 other location'

  it 'handles n locations', ->
    @partnerLocations.add fabricate 'location'
    @partnerLocations.add fabricate 'location'
    @partnerLocations.add fabricate 'location', city: 'Paris'
    @partnerLocations.displayLocations().should.equal 'New York + 3 other locations'

  it 'displays a preferred location if passed in', ->
    @partnerLocations.add fabricate 'location'
    @partnerLocations.add fabricate 'location'
    @partnerLocations.add fabricate 'location', city: 'Paris'
    @partnerLocations.displayLocations('Paris').should.equal 'Paris + 3 other locations'