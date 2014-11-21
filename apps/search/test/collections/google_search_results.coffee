_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
GoogleSearchResults = require '../../collections/google_search_results.coffee'

describe 'GoogleSearchResults', ->
  describe '#parse', ->
    beforeEach ->
      @response = items: [
        { title: 'Auction result page', link: '/artwork/foo/auction-result/foo'}
        { title: 'Auction result page', link: '/artist/foo/auction-results' }
        { title: 'Artist page', link: '/artist/foo' }
      ]

    it 'filters out auction results', ->
      results = new GoogleSearchResults @response, parse: true
      results.length.should.equal 1

    it 'filters out 403s', ->
      @response.items.push title: '403 Forbidden', link: '/artist/bar'
      @response.items.push title: 'Artist page', link: '/artist/baz'
      results = new GoogleSearchResults @response, parse: true
      results.length.should.equal 2

  describe '#moveMatchResultsToTop', ->
    it 'moves matching results to the top', ->
      results = new GoogleSearchResults [
        { title: 'bar bar', link: '/artwork/foo' }
        { title: 'foo bar', link: '/artist/foo' }
      ]
      results.first().get('display').should.equal 'bar bar'
      results.moveMatchResultsToTop 'foo bar'
      results.first().get('display').should.equal 'foo bar'
