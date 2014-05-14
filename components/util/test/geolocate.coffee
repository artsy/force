_           = require 'underscore'
benv        = require 'benv'
sinon       = require 'sinon'
Backbone    = require 'backbone'
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
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#locate', ->
    it 'calls out to an external IP geolocation service when low accuracy is requested', ->
      Geolocate.locate(accuracy: 'low')
      Backbone.sync.args[0][2].url.should.equal 'https://freegeoip.net/json/'
      _.isNull(Backbone.sync.args[0][2].headers).should.be.ok

    it 'uses the browser geolocation API when high accuracy is requested', ->
      benv.expose navigator: geolocation: getCurrentPosition: sinon.stub()
      Geolocate.locate(accuracy: 'high')
      navigator.geolocation.getCurrentPosition.called.should.be.ok

  describe '#loadGoogleMaps', ->
    beforeEach ->
      @gs = $.getScript

    afterEach ->
      $.getScript = @gs

    it 'loads the Google Maps places library and runs the callback', (done) ->
      $.getScript = (url) ->
        url.should.equal 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=true&callback=googleMapsCallback'
        window.googleMapsCallback()
      _.isUndefined(window.googleMapsCallback).should.be.true
      Geolocate.loadGoogleMaps ->
        _.isFunction(window.googleMapsCallback).should.be.true
        done()

    it 'only calls $.getScript once', ->
      Geolocate.googleMapsLoaded = false
      getScriptStub = sinon.stub()
      $.getScript = ->
        getScriptStub()
        window.googleMapsCallback()
      Geolocate.loadGoogleMaps(->)
      Geolocate.loadGoogleMaps(->)
      Geolocate.loadGoogleMaps(->)
      getScriptStub.callCount.should.equal 1
      Geolocate.googleMapsLoaded.should.be.true
