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
