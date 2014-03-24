_           = require 'underscore'
benv        = require 'benv'
sinon       = require 'sinon'
Geolocate   = require '../geolocate'

describe 'Geolocate', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        google: maps:
          Geocoder: -> geocode: sinon.stub()
          LatLng: sinon.stub()
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @coords = latitude:  3.141, longitude: -3.141
    sinon.stub($, 'ajax').yieldsTo('success', @coords)

  afterEach ->
    $.ajax.restore()

  describe '#locate', ->
    it 'falls back to calling out to an external GeoIP service', ->
      Geolocate.locate(->)
      $.ajax.args[0][0].url.should.equal 'http://freegeoip.net/json/'
      google.maps.LatLng.args[0][0].should.equal @coords.latitude
      google.maps.LatLng.args[0][1].should.equal @coords.longitude

    it 'calls out to getCurrentPosition', ->
      benv.expose navigator: geolocation: getCurrentPosition: sinon.stub()
      Geolocate.locate(->)
      navigator.geolocation.getCurrentPosition.called.should.be.ok
