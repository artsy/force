_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Geo = require '../index'

describe 'Geo', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        google: maps:
          Geocoder: -> geocode: sinon.stub()
          LatLng: sinon.stub()
      done()

  after ->
    benv.teardown()

  describe '#locate', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'

    afterEach ->
      Backbone.sync.restore()

    it 'calls out to an external IP geolocation service when low accuracy is requested', ->
      Geo.locate(accuracy: 'low')
      Backbone.sync.args[0][2].url.should.equal 'https://freegeoip.net/json/'
      _.isNull(Backbone.sync.args[0][2].headers).should.be.ok()

    it 'uses the browser geolocation API when high accuracy is requested', ->
      navigator.geolocation = getCurrentPosition: sinon.stub()
      Geo.locate(accuracy: 'high')
      navigator.geolocation.getCurrentPosition.called.should.be.ok()

  describe '#loadGoogleMaps', ->
    beforeEach ->
      Geo.googleMapsLoading = undefined

    it 'loads the Google Maps places library and runs the callback', (done) ->
      sinon.stub $, 'getScript', -> window.googleMapsCallback()

      _.isUndefined(window.googleMapsCallback).should.be.true()
      Geo.loadGoogleMaps ->
        _.isFunction(window.googleMapsCallback).should.be.true()
        $.getScript.restore()
        done()

    it 'only calls $.getScript once', (done) ->
      count = sinon.stub()
      sinon.stub $, 'getScript', ->
        count()
        window.googleMapsCallback()

      Geo.loadGoogleMaps(->)
      Geo.loadGoogleMaps(->)
      Geo.loadGoogleMaps ->
        count.callCount.should.equal 1
        $.getScript.restore()
        done()

    it 'calls back to all callbacks that get attached', (done) ->
      count = sinon.stub()

      sinon.stub $, 'getScript', -> window.googleMapsCallback()

      Geo.loadGoogleMaps count
      Geo.loadGoogleMaps count
      Geo.loadGoogleMaps count
      Geo.loadGoogleMaps count

      Geo.loadGoogleMaps ->
        count.callCount.should.equal 4
        $.getScript.restore()
        done()
