_         = require 'underscore'
sinon     = require 'sinon'
Backbone  = require 'backbone'
benv      = require 'benv'
rewire    = require 'rewire'

geoFormatter =
  getCity        : -> 'My city'
  getState       : -> 'My state'
  getStateCode   : -> 'My statecode'
  getPostalCode  : -> 'My postalcode'
  getCoordinates : -> [0, 0]
  getCountry     : -> 'My country'

Geo = rewire '../../../models/mixins/geo'
Geo.__set__ 'geo', locate: (locateStub = sinon.stub().yieldsTo 'success', geoFormatter)

class Model extends Backbone.Model
  _.extend @prototype, Geo

describe 'Geo Mixin', ->
  beforeEach ->
    @model = new Model

  describe '#approximateLocation, #setGeo', ->
    it 'gets the approximate location by geolocating the IP address', ->
      @model.approximateLocation()
      @model.get('location').city.should.equal 'My city'
      @model.get('location').state.should.equal 'My state'
      @model.get('location').coordinates.should.eql [0, 0]
