{ fabricate } = require '@artsy/antigravity'
Partner = require '../../models/partner'

describe 'Partner', ->
  beforeEach ->
    @partner = new Partner fabricate 'partner',
      type: 'Gallery'
      sortable_id: 'gagosian-gallery'
      default_profile_id: 'gagosian'
    @partner.related().locations.add fabricate 'location'

  describe '#displayType', ->
    it 'returns the correct type string (1)', ->
      @partner.displayType().should.equal 'Gallery'

    it 'returns the correct type string (2)', ->
      @partner.set 'type', 'Auction'
      @partner.displayType().should.equal 'Auction House'

  describe '#alphaSortKey', ->
    it "returns the partner model's sortable_id", ->
      @partner.alphaSortKey().should.equal @partner.get('sortable_id')

  describe '#href', ->
    it "returns the client link to this partner profile slug", ->
      @partner.href().should.equal "/#{@partner.get('default_profile_id')}"

  describe '#displayName', ->
    it "returns the partner's name", ->
      @partner.displayName().should.equal @partner.get('name')

  describe 'partner locations', ->
    it "has related PartnerLocations collection", ->
      @partner.related().locations.length.should.equal(1)

  describe '#displayLocations', ->
    it "acts as a proxy to partner.related().locations", ->
      @partner.displayLocations().should.equal @partner.related().locations.displayLocations()

    it "returns a string representing the partner's locations", ->
      @partner.displayLocations().should.equal 'New York'

