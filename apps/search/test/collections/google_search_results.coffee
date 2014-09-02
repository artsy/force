_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
GoogleSearchResults = require '../../collections/google_search_results.coffee'

describe 'GoogleSearchResults', ->

  it '#parse', ->
    it 'filters out auction results', ->
      results = new GoogleSearchResults()
      items = results.parse {items: [
        {
          link: '/artwork/foo/auction-result/foo'
        },
        {
          link: '/artist/foo/auction-results'
        }
      ]}
      results.length.should.equal 0

  it '#moveMatchResultsToTop', ->
    results = new GoogleSearchResults [
      {
        title: 'bar bar'
        link: '/artwork/foo'
      },
      {
        title: 'foo bar'
        link: '/artist/foo'
      }
    ]
    results.models[0].get('display').should.equal 'bar bar'
    results.moveMatchResultsToTop 'foo bar'
    results.models[0].get('display').should.equal 'foo bar'
