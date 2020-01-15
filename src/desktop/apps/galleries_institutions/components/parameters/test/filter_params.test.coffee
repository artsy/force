benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Params = require '../filter_params.coffee'

describe 'FilterParams', ->
  beforeEach ->
    @params = new Params {location: 'new-york', category: 'painting', type: 'gallery'}

  describe '#currentSelection', ->
    it 'selects the keys that represent search facets', ->
      @params.currentSelection().should.deepEqual {location: 'new-york', category: 'painting'}
      @params.unset 'category'
      @params.currentSelection().should.deepEqual {location: 'new-york'}
      @params.unset 'location'
      @params.currentSelection().should.be.empty()

  describe '#hasSelection', ->
    it 'reflects the presence of facet keys', ->
      @params.hasSelection().should.be.true()
      @params.unset 'category'
      @params.hasSelection().should.be.true()
      @params.unset 'location'
      @params.hasSelection().should.be.false()

  describe '#urlQueryString', ->
    it 'converts facet parameters to url query string', ->
      @params.urlQueryString().should.equal 'location=new-york&category=painting'
      @params.unset 'category'
      @params.urlQueryString().should.equal 'location=new-york'
      @params.unset 'location'
      @params.urlQueryString().should.equal ''




