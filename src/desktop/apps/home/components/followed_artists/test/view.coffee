_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Q = require 'bluebird-q'
Items = require '../../../../../collections/items.coffee'
FollowedArtistsRailView = benv.requireWithJadeify require.resolve('../view.coffee'), ['template']

describe 'FollowedArtistsRailView', ->
  before (done) ->

    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

    sinon.stub Backbone, 'sync'
      .onCall(0)
      .returns Q.resolve fabricate 'artist', id: 'charles-broskoski'
      .onCall(1)
      .returns Q.resolve fabricate 'artist', id: 'damon-zucconi'
    
    @featuredArtists = new Items [
      fabricate 'featured_link' # href: /cat/bitty
      fabricate 'featured_link', href: 'https://www.artsy.net/artist/damon-zucconi'
      fabricate 'featured_link', href: 'https://www.artsy.net/artwork/damon-zucconi'
      fabricate 'featured_link', href: 'https://www.artsy.net/artist/charles-broskoski?fake=true'
    ]

  after ->
    Backbone.sync.restore()
    benv.teardown()

  beforeEach ->
    @view = new FollowedArtistsRailView
      el: $('body')
    
  describe '#_parseAndFetchArtists', ->
    it 'filters out weird urls', ->
      @view._parseAndFetchArtists(@featuredArtists)
        .then (artists) ->
          artists.length.should.equal 2
          artists[0].id.should.equal 'charles-broskoski'
          artists[1].id.should.equal 'damon-zucconi'
