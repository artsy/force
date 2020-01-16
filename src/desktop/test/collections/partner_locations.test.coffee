{ fabricate } = require '@artsy/antigravity'
PartnerLocation = require '../../models/partner_location'
PartnerLocations = require '../../collections/partner_locations'

describe 'PartnerLocations', ->
  beforeEach ->
    @partnerLocations = new PartnerLocations []
    @partnerLocations.add fabricate 'location'

  describe '#displayLocations', ->
    it "returns a string representing the partner's locations", ->
      @partnerLocations.displayLocations().should.equal 'New York'

    it 'handles 2 locations', ->
      @partnerLocations.add fabricate 'location'
      @partnerLocations.displayLocations().should.equal 'New York & 1 other location'

    it 'handles n locations', ->
      @partnerLocations.add fabricate 'location'
      @partnerLocations.add fabricate 'location'
      @partnerLocations.add fabricate 'location', city: 'Paris'
      @partnerLocations.displayLocations().should.equal 'New York & 3 other locations'

    it 'displays a preferred location if passed in', ->
      @partnerLocations.add fabricate 'location'
      @partnerLocations.add fabricate 'location'
      @partnerLocations.add fabricate 'location', city: 'Paris'
      @partnerLocations.displayLocations('Paris').should.equal 'Paris & 3 other locations'

  describe '#displayCities', ->
    beforeEach ->
      @partnerLocations.add fabricate 'location', city: 'New York'
      @partnerLocations.add fabricate 'location', city: 'Paris'
      @partnerLocations.add fabricate 'location', city: 'new york'
      @partnerLocations.add fabricate 'location', city: 'Taipei'
      @partnerLocations.add fabricate 'location', city: 'Taipei'

    it 'displays unique titlized cities separated by comma by default', ->
      @partnerLocations.displayCities().should.equal 'New York, Paris, Taipei'

    it 'displays unique titlized cities separated by custom separator', ->
      @partnerLocations.displayCities(' (*´∀`)~♥ ').should.equal 'New York (*´∀`)~♥ Paris (*´∀`)~♥ Taipei'

    it 'displays duplicate titlized cities separated by custom separator', ->
      @partnerLocations.displayCities(' • ', false).should.equal 'New York • New York • Paris • New York • Taipei • Taipei'
