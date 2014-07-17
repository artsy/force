_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Artist = require '../../models/artist'
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

    it 'fetches the artists artworks and adds published=true', ->
      @artist.fetchArtworks()
      _.last(Backbone.sync.args)[1].url.should.include "artist/#{@artist.get 'id'}/artworks"
      _.last(Backbone.sync.args)[2].data.published.should == true

    it 'fetches the artists artworks and adds published=true', ->
      @artist.fetchArtworks({ success: sinon.stub() })
      _.last(Backbone.sync.args)[1].url.should.include "artist/#{@artist.get 'id'}/artworks"
      _.last(Backbone.sync.args)[2].data.published.should == true

  describe '#validSort', ->

    it 'only returns true for values in the valid sort hash', ->
      _(_.keys(@artist.sortCriteriaForArtworks)).each (key) =>
        @artist.validSort(key).should.be.ok
      @artist.validSort('random').should.not.be.ok

  describe '#displayAvailableWorks', ->
    it 'returns a string describing the number of available and reference works', ->
      @artist.set published_artworks_count: 2, forsale_artworks_count: 1
      @artist.displayAvailableWorks().should.equal '1 available work & 1 reference work'
      @artist.set published_artworks_count: 4, forsale_artworks_count: 2
      @artist.displayAvailableWorks().should.equal '2 available works & 2 reference works'
      @artist.set published_artworks_count: 400, forsale_artworks_count: 125
      @artist.displayAvailableWorks().should.equal '125 available works & 275 reference works'
      @artist.set published_artworks_count: 2, forsale_artworks_count: 0
      @artist.displayAvailableWorks().should.equal '2 reference works'
      @artist.set published_artworks_count: 2, forsale_artworks_count: 2
      @artist.displayAvailableWorks().should.equal '2 available works'

  describe '#toJSONLD', ->

    it 'returns valid json', ->
      json = @artist.toJSONLD()
      json['@context'].should.equal 'http://schema.org'
      json['@type'].should.equal 'Person'
      json.name.should.equal 'Pablo Picasso'

  describe '#toJSONLDShort', ->

    it 'returns valid json', ->
      json = @artist.toJSONLDShort()
      json['@type'].should.equal 'Person'
      json.name.should.equal 'Pablo Picasso'
      json.sameAs.should.include 'artist/pablo-picasso'
