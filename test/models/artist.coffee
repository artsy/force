_             = require 'underscore'
sinon         = require 'sinon'
Backbone      = require 'backbone'
Artist        = require '../../models/artist'
{ fabricate } = require 'antigravity'

describe 'Artist', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artist = new Artist fabricate 'artist'

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up related artist collections', ->
      @artist.relatedArtists.url.should.include '/api/v1/related/layer/main/artists'
      @artist.relatedContemporary.url.should.include '/api/v1/related/layer/contemporary'

  describe '#fetchRelatedArtists', ->

    it 'fetches one of its related artist collections with sensible default params', ->
      @artist.fetchRelatedArtists 'Contemporary'
      _.last(Backbone.sync.args)[1].url.should.include 'layer/contemporary'
      _.last(Backbone.sync.args)[2].data.size.should.equal 5

  describe '#fetchArtworks', ->

    it 'fetches the artists artworks', ->
      @artist.fetchArtworks()
      _.last(Backbone.sync.args)[1].url.should.include "artist/#{@artist.get 'id'}/artworks"

  describe '#validSort', ->

    it 'only returns true for values in the valid sort hash', ->
      _(_.keys(@artist.sortCriteriaForArtworks)).each (key) =>
        @artist.validSort(key).should.be.ok
      @artist.validSort('random').should.not.be.ok