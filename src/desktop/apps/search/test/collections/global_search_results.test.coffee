_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
GlobalSearchResults = require '../../collections/global_search_results.coffee'

describe 'GlobalSearchResults', ->
  describe '#parse', ->
    beforeEach ->
      @response = [
        { display: 'Artist page', model: 'artist', artist: 'zoe leonard' }
        { display: 'Partner Show Page', model: 'partnershow', venue: 'Foo Gallery' }
      ]

    it 'filters out sensitive results', ->
      results = new GlobalSearchResults @response, parse: true
      results.length.should.equal 1