_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
GlobalSearchResults = require '../../collections/global_search_results'

describe 'GlobalSearchResults', ->
  describe '#parse', ->
    beforeEach ->
      @response = [
        { display: 'Artist page', model: 'artist', display: 'zoe leonard' }
        { display: 'Partner Show Page', model: 'partnershow', venue: 'Foo Gallery' }
      ]

    it 'filters out sensitive results', ->
      results = new GlobalSearchResults @response, parse: true
      results.length.should.equal 1

  describe '#moveMatchResultsToTop', ->
    it 'moves matching results to the top', ->
      results = new GlobalSearchResults [
        { display: 'bar bar', model: 'fair' }
        { display: 'foo bar', model: 'fair' }
      ]
      results.first().get('display').should.equal 'bar bar'
      results.moveMatchResultsToTop 'foo bar'
      results.first().get('display').should.equal 'foo bar'
