PartnerLocation = require '../../models/partner_location'
{ fabricate } = require '@artsy/antigravity'

describe 'PartnerLocation', ->

  beforeEach ->
    @location = new PartnerLocation fabricate 'location'

  describe '#fullAddress', ->

    it 'concats all the data into one nice line', ->
      @location.fullAddress().should.equal '529 W 20th St., New York, NY 10011'

  describe '#cityState', ->

    it "returns the location's city and state joined with comma", ->
      @location.cityState().should.equal "#{@location.get('city')}, #{@location.get('state')}"

  describe '#gmapLink', ->

    it 'returns a link to google maps for the location', ->
      @location.gmapLink().should.containEql "https://maps.google.com/maps"
      @location.gmapLink().should.containEql encodeURIComponent @location.fullAddress()

    it 'uses the geo coordinates if available', ->
      coords = { lng: -73.996035, lat: 40.767494 }
      @location.set 'coordinates', coords
      @location.gmapLink().should.containEql "https://maps.google.com/maps"
      @location.gmapLink().should.containEql encodeURIComponent "#{coords.lat},#{coords.lng}"

  describe '#gmapImageUrl', ->

    it 'generates a google maps image url for the location', ->
      @location.gmapImageUrl().should.containEql(
        'http://maps.googleapis.com/maps/api/staticmap?center=529%20W%2020th%20' +
        'St.%2C%20New%20York%2C%20NY%2010011&markers=color'
      )

    it 'takes a size param', ->
      @location.gmapImageUrl('300x300').should.containEql('300x300')
