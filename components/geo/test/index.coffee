_           = require 'underscore'
benv        = require 'benv'
sinon       = require 'sinon'
Backbone    = require 'backbone'
Geo         = require '../index'

describe 'Geo', ->
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
      Geo.locate(accuracy: 'low')
      Backbone.sync.args[0][2].url.should.equal 'https://freegeoip.net/json/'
      _.isNull(Backbone.sync.args[0][2].headers).should.be.ok

    it 'uses the browser geolocation API when high accuracy is requested', ->
      benv.expose navigator: geolocation: getCurrentPosition: sinon.stub()
      Geo.locate(accuracy: 'high')
      navigator.geolocation.getCurrentPosition.called.should.be.ok

  describe '#loadGoogleMaps', ->
    beforeEach ->
      @gs = $.getScript

    afterEach ->
      $.getScript = @gs

    it 'loads the Google Maps places library and runs the callback', (done) ->
      $.getScript = (url) ->
        url.should.equal 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=true&language=en&callback=googleMapsCallback'
        window.googleMapsCallback()
      _.isUndefined(window.googleMapsCallback).should.be.true
      Geo.loadGoogleMaps ->
        _.isFunction(window.googleMapsCallback).should.be.true
        done()

    it 'only calls $.getScript once', ->
      Geo.googleMapsLoaded = false
      getScriptStub = sinon.stub()
      $.getScript = ->
        getScriptStub()
        window.googleMapsCallback()
      Geo.loadGoogleMaps(->)
      Geo.loadGoogleMaps(->)
      Geo.loadGoogleMaps(->)
      getScriptStub.callCount.should.equal 1
      Geo.googleMapsLoaded.should.be.true
