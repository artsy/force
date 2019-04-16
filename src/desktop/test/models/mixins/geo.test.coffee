_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
benv = require 'benv'
rewire = require 'rewire'

googleyAddress =
  address_components: [
    long_name: "New York"
    short_name: "New York"
    types: ["locality", "political"]
  ,
    long_name: "New York"
    short_name: "NY"
    types: ["administrative_area_level_1", "political"]
  ,
    long_name: "United States"
    short_name: "US"
    types: ["country", "political"]
  ]
  adr_address: "<span class=\"locality\">New York</span>, <span class=\"region\">NY</span>, <span class=\"country-name\">USA</span>"
  formatted_address: "New York, NY, USA"
  geometry:
    location:
      lb: 40.7143528
      mb: -74.0059731
      lat: -> 40.7143528
      lng: -> -74.0059731
    viewport:
      ea:
        d: 40.496006
        b: 40.91525559999999
      fa:
        b: -74.2557349
        d: -73.7002721
  icon: "http://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
  id: "7eae6a016a9c6f58e2044573fb8f14227b6e1f96"
  name: "New York"
  reference: "CoQBdAAAACZimk_9WwuhIeWFwtMeNqiAV2daRpsJ41qmyqgBQjVJiuokc6XecHVoogAisPTRLsOQNz0UOo2hfGM2I40TUkRNYveLwyiLX_EdSiFWUPNGBGkciwDInfQa7DCg2qdIkzKf5Q8YI_eCa8NbSTcJWxWTJk3cOUq4N82u3aDaGEMXEhCEDqVRiEBNj1FktOhIJ21XGhRhPghlJuXsUpx_cmTfrW34g9T8Pg"
  types: ["locality", "political"]
  url: "https://maps.google.com/maps/place?q=New+York&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62"
  vicinity: "New York"
  html_attributions: []

geoFormatter =
  getCity: -> 'My city'
  getState: -> 'My state'
  getStateCode: -> 'My statecode'
  getPostalCode: -> 'My postalcode'
  getCoordinates: -> [0, 0]
  getCountry: -> 'My country'

Geo = rewire '../../../models/mixins/geo'
Geo.__set__ 'geo', locate: (locateStub = sinon.stub().yieldsTo 'success', geoFormatter)

class User extends Backbone.Model
  _.extend @prototype, Geo

describe 'Geo Mixin', ->
  beforeEach ->
    @user = new User

  describe '#hasLocation', ->
    it 'determines whether or not there is a valid location', ->
      @user.hasLocation().should.be.false()
      @user.set location: city: 'existy'
      @user.hasLocation().should.be.true()

  describe '#approximateLocation, #setGeo', ->
    it 'gets the approximate location by geolocating the IP address', ->
      @user.approximateLocation()
      @user.get('location').city.should.equal 'My city'
      @user.get('location').state.should.equal 'My state'
      @user.get('location').coordinates.should.eql [0, 0]

    it 'accepts a success callback', (done) ->
      @user.approximateLocation success: done

  describe '#setLocation', ->
    it 'should allow a user to set a location object that Google returns', ->
      @user.setLocation googleyAddress
      @user.location().cityStateCountry().should.equal 'New York, New York, United States'

    it 'should allow a user to set a non-standard name as their location', ->
      @user.setLocation name: 'Foobar'
      @user.location().cityStateCountry().should.equal 'Foobar'

    it 'should allow a user to clear their location', ->
      @user.setLocation name: ''
      @user.location().cityStateCountry().should.equal ''
