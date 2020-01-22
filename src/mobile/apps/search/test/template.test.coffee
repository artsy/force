benv = require 'benv'
_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
SearchResults = require '../../../collections/search_results'
SearchResult = require '../../../models/search_result'
sinon = require 'sinon'

{ resolve } = require 'path'

describe 'Search results template', ->
  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      done()

  after ->
    Backbone.sync.restore()
    benv.teardown()

  beforeEach ->
    @search = new SearchResults

  describe 'No results', ->
    beforeEach (done) ->
      @template = benv.render(resolve(__dirname, '../template.jade'), {
        sd: {}
        results: []
        mainHeaderSearchBoxValue: 'foobar'
      }, ->
        done()
      )

    it 'displays a message to the user that nothing can be found', ->
      $('body').html().should.containEql 'Nothing found'

  describe 'Has results', ->
    beforeEach (done) ->
      @artworks = _.times 2, (i)->
        new SearchResult({
          title: "Artwork Title | Artist | Artsy"
          model: 'artwork',
          display_model: 'Artwork',
          id: 'cool-artwork' + i,
          image_url: 'foo.jpg'
        })
      @artists = _.times 3, (i) ->
        new SearchResult({
          title: "Artist Name | Artsy"
          model: 'artist',
          display_model: 'Artist',
          id: 'cool-artist' + i,
          image_url: 'bar.jpg'
        })

      @search.add @artworks
      @search.add @artists

      @template = benv.render(resolve(__dirname, '../template.jade'), {
        sd: {}
        results: @search.models
        mainHeaderSearchBoxValue: 'foobar'
      }, ->
        done()
      )

    it 'renders the search results', ->
      $('.search-result').length.should.equal 5
