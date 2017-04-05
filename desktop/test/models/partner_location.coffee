_ = require 'underscore'
sd = require('sharify').data
benv = require 'benv'
sinon = require 'sinon'
should = require 'should'
Backbone = require 'backbone'
PartnerLocation = require '../../models/partner_location'
{ getDirections } = require '../../components/util/google_maps'

describe 'PartnerLocation', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      sd.GOOGLE_MAPS_API_KEY = 'GOOGLE-MAPS-API-KEY'
      done()

  after ->
    benv.teardown()


  beforeEach ->
    @partnerLocation = new PartnerLocation
      id: 'partner-location'
      name: 'Partner Location'
      city: 'City'
      address: 'Address'
      state: 'State'
      postal_code: '00000'
      phone: '555-555-5555'
    @partnerLocationMissingInfo = new PartnerLocation
      id: 'partner-location'
      name: 'Partner Location'
      city: 'City'
      address: 'Address'

  describe '#singleLine', ->

    it "formats location on a single line", ->
      @partnerLocation.singleLine().should.equal 'City, Address'
      @partnerLocationMissingInfo.set 'city', ''
      @partnerLocationMissingInfo.singleLine().should.equal 'Address'
      @partnerLocation.singleLine().should.equal "#{@partnerLocation.get('city')}, #{@partnerLocation.get('address')}"
      @partnerLocation.set 'address_2', 'Ste 227'
      @partnerLocation.singleLine().should.equal "#{@partnerLocation.get('city')}, #{@partnerLocation.get('address')} #{@partnerLocation.get('address_2')}"

  describe '#lines', ->

    it 'returns an array of strings for the address', ->
      @partnerLocation.lines().should.containEql @partnerLocation.get 'address'
      @partnerLocation.lines().should.containEql @partnerLocation.cityStatePostalCode()
      @partnerLocation.set
        address_2: '25th Floor'
        country: 'USA'
      @partnerLocation.lines().should.containEql @partnerLocation.get 'address'
      @partnerLocation.lines().should.containEql @partnerLocation.get 'address_2'
      @partnerLocation.lines().should.containEql @partnerLocation.cityStatePostalCode()
      @partnerLocation.lines().should.containEql @partnerLocation.get 'country'

  describe '#cityState', ->

    it 'ignores blank values', ->
      @partnerLocation.set 'city', ''
      @partnerLocation.cityState().should.equal @partnerLocation.get('state')
      @partnerLocation.set { city: 'Beverly Hills', state: '' }
      @partnerLocation.cityState().should.equal @partnerLocation.get('city')

  describe '#cityStateCountry', ->

    it 'ignores blank values', ->
      @partnerLocation.cityStateCountry().should.equal "#{@partnerLocation.get('city')}, #{@partnerLocation.get('state')}"
      @partnerLocation.set { country: 'United States' }
      @partnerLocation.cityStateCountry().should.equal "#{@partnerLocation.get('city')}, #{@partnerLocation.get('state')}, #{ @partnerLocation.get('country')}"

  describe '#cityStatePostalCode', ->

    it 'returns a string for city, state, and postal code omitting missing values', ->
      pl = @partnerLocation
      pl.cityStatePostalCode().should.equal "#{pl.get('city')}, #{pl.get('state')} #{pl.get('postal_code')}"

  describe '#displayName', ->

    it 'Formatted displayName', ->
      @partnerLocation.displayName().should.equal 'Partner Location'
      @partnerLocationMissingInfo.displayName().should.equal 'Partner Location'

  describe '#displayAddress', ->

    it 'Formats address', ->
      @partnerLocation.displayAddress().should.equal 'Address, City, State 00000'
      @partnerLocationMissingInfo.displayAddress().should.equal 'Address, City'

  describe '#toHtml', ->

    it "Correctly formats as html", ->
      @partnerLocation.toHtml().should.equal 'Address<br/>City, State 00000<br/>Tel: 555-555-5555'
      @partnerLocationMissingInfo.toHtml().should.equal 'Address<br/>City'

  describe '#googleMapsLink', ->

    it "returns q and hnear params for an address only location", ->
      @partnerLocation.googleMapsLink().should.equal 'https://maps.google.com/maps?q=Address%2C%20City%2C%20State%2000000&hnear=Address%2C%20City%2C%20State%2000000'

    it "returns only a q param for locations with coordinates", ->
      @partnerLocation.set 'coordinates', { lng: -74.0093178, lat: 40.2163901 }
      @partnerLocation.googleMapsLink().should.equal 'https://maps.google.com/maps?q=40.2163901%2C-74.0093178'

  describe '#mapDirections', ->
    beforeEach ->
      @partnerLocation.set 'coordinates', { lng: -74.0093178, lat: 40.2163901 }

    it "returns get directions", ->
      origin = '210 Main St New York, NY'
      @partnerLocation.mapDirections(origin).should.equal 'https://www.google.com/maps/dir/210%20Main%20St%20New%20York,%20NY/40.2163901,-74.0093178'

