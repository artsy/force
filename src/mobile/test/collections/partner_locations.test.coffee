Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
PartnerLocations = require '../../collections/partner_locations'

describe 'PartnerLocations', ->

  beforeEach ->
    @shows = new PartnerLocations null, partnerId: 'foobar'

  describe '#url', ->

    it 'includes the partner id', ->
      @shows.url().should.containEql '/api/v1/partner/foobar/locations'
