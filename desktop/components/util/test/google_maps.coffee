_ = require 'underscore'
sd = require('sharify').data
should = require 'should'
Backbone = require 'backbone'
benv = require 'benv'
{ getMapImageSrc, getMapLink, getDirections } = require "../google_maps.coffee"

describe "PartnerLocation", ->

  before (done) ->
    @location = 'Address, City, State 00000'
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      sd.GOOGLE_MAPS_API_KEY = 'GOOGLE-MAPS-API-KEY'
      done()

  after ->
    benv.teardown()

  describe '#mapImgSrc', ->

    it "returns a correct google maps url", ->
      getMapImageSrc(
        size: "300x300"
        center: @location
        markers: "color:0x873ff0|#{@location}"
      ).should.equal 'https://maps.googleapis.com/maps/api/staticmap?size=300x300&center=Address%2C%20City%2C%20State%2000000&markers=color%3A0x873ff0%7CAddress%2C%20City%2C%20State%2000000&maptype=roadmap&sensor=false&style=lightness%3A50%7Csaturation%3A-100&zoom=16&key=GOOGLE-MAPS-API-KEY'

  describe '#googleMapsLink', ->

    it 'returns a formatted google maps url', ->
      options =
        q: @location
        hnear: @location
      getMapLink(options).should.equal 'https://maps.google.com/maps?q=Address%2C%20City%2C%20State%2000000&hnear=Address%2C%20City%2C%20State%2000000'

  describe '#getDirections', ->

    it 'returns accurate google map directions', ->
      options =
        origin: '210 Main Street New York NY'
        destination: @location
      getDirections(options).should.equal 'https://www.google.com/maps/dir/210%20Main%20Street%20New%20York%20NY/Address, City, State 00000'
